var db = require("../models");

module.exports = {

renderAddService : function(req, res){
console.log("logged in before render");
	db.serviceOffer.findAll({}).then(function(data){

		var serviceObject = {
      			services: data
    	};
    console.log("inside addService");
     console.log(req.session.user);

	res.render("addService", serviceObject);

    	// console.log(serviceObject);

    	// console.log("HHHH"+ serviceObject.services[0].dataValues.serviceName);
		// console.log("logged in before render");
  //   	res.render("addService", serviceObject);
  //   	console.log("logged in after render");

	})
},

addServiceDb : function(req, res){

var serviceId = req.body.serviceId;
var description = req.body.description;
var discount = req.body.discount;

console.log("inside addServiceDB");
     console.log(req.session.user);

  db.userService.create({
    serviceOfferServiceId: serviceId,
    description: description,
    discount: discount,
    userProfileUserId: req.session.userId

  }).then(function(err, user){
    if(err){
      throw err;
    }
    console.log(req.body);
  });


}






}


