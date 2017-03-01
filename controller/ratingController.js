var db = require("../models");
var nodeMailer = require("../config/nodeMailer")


var ratingController = {
	likeCreate : function(req, res, cb){
		
	db.userRating.create({

    	isLiked: true,
    	customerId: req.session.user.userId,
    	// createdAt: req.body.created_at,
     //  	updatedAt: req.body.created_at,
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
    	// createdAt: req.body.created_at,
     //  	updatedAt: req.body.created_at,
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
                                         res.render("/errorPage");
                                        
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
                                         res.render("/errorPage");
                                        
                                     }
                          });

                }
                        
            });

    // db.userRating.create({

    // 	isLiked: true,
    // 	customerId: req.session.user.userId,
    // 	// createdAt: req.body.created_at,
    //  //  	updatedAt: req.body.created_at,
    //   	userServiceId : req.body.descriptionId
   
    // }).then(function(user) {

    // 	res.redirect("/service1");
         
    //     console.log(user);
       
    // }).catch(function(error){
    //     console.log(error);
        
    // })

	},

	dislikeRating : function(req, res){

		console.log(req.body);

		console.log(req.body.created_at);


        var sender = req.session.user.email;// sender address
        var receiver = req.body.serviceProviderEmail; // list of receivers
        var messageSubject = "U have receive an unlike"; // Subject line
        var message = "HEY... Someone hates You"; // plain text body


		db.userRating.findOne({
			
			where: {customerId: req.session.user.userId,
					userServiceId: req.body.descriptionId
					}
            }).then(function(user){

                console.log("user");
                console.log(user);

                if (user == null || user == undefined){

                		  ratingController.dislikeCreate(req, res, function(user){
                                
                                
                                     if(!user.error){
                                     	//email serviceProvider

                                        console.log("after created");

                                        

                                        nodeMailer(sender, receiver, messageSubject, message,
                                        function(info){

                                            res.render("dislikeMessage");


                                        });

                                        
                                     }else if (user.error) {
                                        console.log(user.error);
                                        //res.json({error: user.error});
                                         res.render("/errorPage");
                                        
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

                                                res.render("dislikeMessage");


                                        });
                                        
                                        
                                     }else if (user.error) {
                                        console.log(user.error);
                                        //res.json({error: user.error});
                                         res.render("/errorPage");
                                        
                                     }

                          });
                    
                    
                    
                }
                        
            });

	}
}

module.exports = ratingController;

