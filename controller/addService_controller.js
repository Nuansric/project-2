var db = require("../models");

module.exports = {

renderAddService : function(req, res){
console.log("logged in before render");
	db.serviceOffer.findAll({}).then(function(data){

		var serviceObject = {
      			services: data,
            currentUser : req.session.user.firstName
    	};
    console.log("inside addService");
     console.log(req.session.user);

	res.render("addService", serviceObject);

    	// console.log(serviceObject);

    	// console.log("HHHH"+ serviceObject.services[0].dataValues.serviceName);
		// console.log("logged in before render");
  //   	res.render("addService", serviceObject);
  //   	console.log("logged in after render");

	}).catch(function(error){
          console.log(error);
          res.redirect("/errorPage");
        //  res.json({error: "We are experiencing technical difficulty. Please try again..."});
});
},

addServiceDb : function(req, res){

var serviceId = req.body.serviceId;
var description = req.body.description;
var discount = req.body.discount;

console.log("inside addServiceDB");
     console.log(req.session.user);

  db.userService.create({
   
    description: description,
    discount: discount,
    serviceOfferServiceId: serviceId,
    userProfileUserId: req.session.user.userId
    
  }).then(function(user){

    if(user){
      res.redirect("/landing");
    }
   
  }).catch(function(error){
          console.log(error);
          res.redirect("/errorPage");
        //  res.json({error: "We are experiencing technical difficulty. Please try again..."});
});


}






}


