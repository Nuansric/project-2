// import the models
var db = require("../models");
// import functions from nodeMailer.js
var nodeMailer = require("../config/nodeMailer");

var ratingController = {
    // This function shows the user website policy if they dislike
    // a service provider
    dislikePolicy : function(req, res){

        var obj = {
        descriptionID: req.body.descriptionId,
        currentUser :  req.session.user.firstName,
        providerEmail : req.body.serviceProviderEmail
        };

    res.render("dislikeMessage", obj);

    },

    // This functions adds "like" to service providers profile
    likeCreate : function(req, res, cb){
        
        db.userRating.create({

            isLiked: true,
            customerId: req.session.user.userId,
            createdAt: req.body.created_at,
            updatedAt: req.body.created_at,
            userServiceId : req.body.descriptionId
    
        }).then(function(user) {
            
                cb(user);
        
            }).catch(function(error){
                    console.log(error);
                    cb({error: error.errors[0].message});
                });

    },

    // This functions adds "dislike" to service provides profile
    dislikeCreate : function(req, res, cb){
        
        db.userRating.create({

            isLiked: false,
            customerId: req.session.user.userId,
            createdAt: req.body.created_at,
            updatedAt: req.body.created_at,
            userServiceId : req.body.descriptionId
    
        }).then(function(user) {
            
                cb(user);
        
            }).catch(function(error){
                    console.log(error);
                    cb({error: error.errors[0].message});
                });

    },
    // This function changes the "dislike" to "like" in service providers profile
    likeUpdate : function(req, res, cb){
        
        db.userRating.update({
            isLiked: true,
            createdAt: req.body.created_at,
            updatedAt: req.body.created_at
        }, {
            where: {
                customerId: req.session.user.userId,
                $and: {
                    userServiceId: req.body.descriptionId
                }
            }       
        }).then(function(user) {
            
                cb(user);
        
            }).catch(function(error){
                    console.log(error);
                    cb({error: error.errors[0].message});
                });

    },
    // This function changes the "like" to "dislike" in service providers profile
    dislikeUpdate : function(req, res, cb){
        
        db.userRating.update({
            isLiked: false,
            createdAt: req.body.created_at,
            updatedAt: req.body.created_at
        }, {
            where: {customerId: req.session.user.userId,
                    $and: [{userServiceId: req.body.descriptionId}]
                    }
        }).then(function(user) {
            
                cb(user);
        
            }).catch(function(error){
                    console.log(error);
                    cb({error: error.errors[0].message});
                })

    },

    // This function handles the logic for creating like/dislike using the functions
    // defined above
    likeRating : function(req, res){
        
        // console.log(req.body);
        // console.log(req.body.created_at);

        db.userRating.findOne({    
            where: {
                customerId: req.session.user.userId,
                $and: {
                    userServiceId: req.body.descriptionId
                }
            }       
        }).then(function(user){
                // console.log("user");
                // console.log(user);
                // If the user has not rated the service provider, user should be null
                // or undefined. If that is the case
                if (user == null || user == undefined) {
                    // create the "like" entry in the database
                    ratingController.likeCreate(req, res, function(user){
                                
                        // console.log("it is null");
                        // if there is no error
                        if(!user.error){

                            // console.log("after created");

                            // redirect user to the service page
                            res.redirect("/service1");
                        }
                        // if there is an error
                        else if (user.error) {
                            console.log(user.error);
                            //res.json({error: user.error});
                            // redirect the user to the error page
                            res.redirect("/errorPage");                                   
                        }
                    });           
                }
                // if the user exists in the rating table
                else if (user){
                    // update the service provider rating to "like".
                    ratingController.likeUpdate(req, res, function(user){
                        // if there is no error
                        if(!user.error){

                        //console.log("after created");
                        // redirect the user to service page
                        res.redirect("/service1");
                        
                        }
                        // if there is an error
                        else if (user.error) {
                            console.log(user.error);
                            //res.json({error: user.error});
                            // redirect the user to the error page
                            res.redirect("/errorPage");
                        }
                    });

                }
                        
            });

    },

    // Following function handles the logic if the user clicks dislike button
    dislikeRating : function(req, res){
        // store the information about the user, the service provider and the message in a variable
        var sender = req.session.user.email;// sender address
        var receiver = req.body.serviceProviderEmail; // list of receivers
        var messageSubject = "An Important Rating Message from The Neighbor Network"; // Subject line
        var message = "Recently, a user went onto our site and gave you a 'dislike' rating. At The Neighbor Network, we understand that some less than par business transactions can occur for many different reasons. We give our service providers two days to respond directly to the user in an attempt to correct the issue. The user will be prompted two days from now to finalize their rating, where they can keep the rating the same, and post what they have already written, (You don’t want that!) or change it as a result of you making things right with your customer. Here at The Neighbor Network, we want to keep business in our own neighborhoods, and keep our service providers and customers happy. Sincerely, the Neighbor Network."; // plain text body

        // 
        db.userRating.findOne({
            
            where: {customerId: req.session.user.userId,
                    userServiceId: req.body.descriptionId
                }
            // If the user has not rated the service provider, user should be null
            // or undefined. If that is the case
        }).then(function(user){

                if (user == null || user == undefined){

                    ratingController.dislikeCreate(req, res, function(user){
                    
                        if(!user.error){
                            //console.log("after created");
                            //email serviceProvider
                            nodeMailer(sender, receiver, messageSubject, message,
                            function(info){
                                //redirect user to the landing page, after the e-mail is sent
                                res.redirect("/landing");
                            });

                        }
                        else if (user.error) {
                            console.log(user.error);
                            //res.json({error: user.error});
                            res.redirect("/errorPage");
                            
                        }
                    });
              
                 }
                else if (user){

                    ratingController.dislikeUpdate(req, res, function(user){
                           
                        if(!user.error){
                            // console.log("after created");
                            //email serviceProvider
                            nodeMailer(sender, receiver, messageSubject, message,
                            function(info){
                                
                                res.redirect("/landing");
                            });                           
                            
                        }
                        else if (user.error) {
                            console.log(user.error);
                            //res.json({error: user.error});
                            res.redirect("/errorPage");                           
                        }
                    });                                      
                }                        
            });
    }
};

module.exports = ratingController;

