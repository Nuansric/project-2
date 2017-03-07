var db = require("../models");
var nodeMailer = require("../config/nodeMailer")


var ratingController = {

  dislikePolicy : function(req, res){


    var obj = {
      descriptionID: req.body.descriptionId,
      currentUser :  req.session.user.firstName,
      providerEmail : req.body.serviceProviderEmail
  }

        res.render("dislikeMessage", obj);



  },


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
    })

    },

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
    })

    },

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
    })

    },

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



    likeRating : function(req, res){
        console.log(req.body);

        console.log(req.body.created_at);

        db.userRating.findOne({
            
            where: {
        customerId: req.session.user.userId,
        $and: {
            userServiceId: req.body.descriptionId
        }
    }       
            }).then(function(user){

                console.log("user");
                console.log(user);

                if (user == null || user == undefined) {

                          ratingController.likeCreate(req, res, function(user){
                                
                                console.log("it is null");
                                     if(!user.error){
                                        //email serviceProvider

                                        console.log("after created");

                                        res.redirect("/service1");
                                        
                                     }else if (user.error) {
                                        console.log(user.error);
                                        //res.json({error: user.error});
                                         res.redirect("/errorPage");
                                        
                                     }
                          });
              
                 }
                else if (user){

                    ratingController.likeUpdate(req, res, function(user){
                                
                                
                                     if(!user.error){
                                        //email serviceProvider

                                        console.log("after created");

                                        res.redirect("/service1");
                                        
                                     }else if (user.error) {
                                        console.log(user.error);
                                        //res.json({error: user.error});
                                          res.redirect("/errorPage");
                                        
                                     }
                          });

                }
                        
            });

    // db.userRating.create({

    //  isLiked: true,
    //  customerId: req.session.user.userId,
    //  // createdAt: req.body.created_at,
    //  //      updatedAt: req.body.created_at,
    //      userServiceId : req.body.descriptionId
   
    // }).then(function(user) {

    //  res.redirect("/service1");
         
    //     console.log(user);
       
    // }).catch(function(error){
    //     console.log(error);
        
    // })

    },

    dislikeRating : function(req, res){

      

        var sender = req.session.user.email;// sender address
        var receiver = req.body.serviceProviderEmail; // list of receivers
        var messageSubject = "An Important Rating Message from The Neighbor Network"; // Subject line
        var message = "Recently, a user went onto our site and gave you a 'dislike' rating. At The Neighbor Network, we understand that some less than par business transactions can occur for many different reasons. We give our service providers two days to respond directly to the user in an attempt to correct the issue. The user will be prompted two days from now to finalize their rating, where they can keep the rating the same, and post what they have already written, (You don’t want that!) or change it as a result of you making things right with your customer. Here at The Neighbor Network, we want to keep business in our own neighborhoods, and keep our service providers and customers happy. Sincerely, the Neighbor Network."; // plain text body


        db.userRating.findOne({
            
            where: {customerId: req.session.user.userId,
                    userServiceId: req.body.descriptionId
                    }
            }).then(function(user){


                if (user == null || user == undefined){

                          ratingController.dislikeCreate(req, res, function(user){
                                
                                
                                     if(!user.error){
                                        //email serviceProvider

                                        console.log("after created");

                                        

                                        nodeMailer(sender, receiver, messageSubject, message,
                                        function(info){
                                            res.redirect("/landing");


                                        });

                                        
                                     }else if (user.error) {
                                        console.log(user.error);
                                        //res.json({error: user.error});
                                         res.redirect("/errorPage");
                                        
                                     }

                          });
              
                 }
                else if (user){

                    ratingController.dislikeUpdate(req, res, function(user){
                                
                                
                                     if(!user.error){
                                        //email serviceProvider

                                        console.log("after created");

                                        

                                        nodeMailer(sender, receiver, messageSubject, message,
                                        function(info){
                                            
                                            res.redirect("/landing");


                                        });
                                        
                                        
                                     }else if (user.error) {
                                        console.log(user.error);
                                        //res.json({error: user.error});
                                       res.redirect("/errorPage");
                                        
                                     }

                          });
                    
                    
                    
                }
                        
            });

    }
}

module.exports = ratingController;

