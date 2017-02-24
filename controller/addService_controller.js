var db = require("../models");

module.exports = {

renderAddService : function(req, res){

	db.serviceOffer.findAll({}).then(function(data){

		var serviceObject = {
      			services: data
    	};

    	// console.log(serviceObject);

    	// console.log("HHHH"+ serviceObject.services[0].dataValues.serviceName);

    	res.render("addService", serviceObject);

	})
},

addServiceDb : function(req, res){
	var serviceId = req.body.serviceId;
	var description = req.body.description;
	var discount = req.body.discount;

	db.userService.create({
		userId: serviceId,
		description: description,
		discount: discount
	}).then(function(err, user){
		if(err){
			throw err;
		}
		console.log(req.body);
	});
	
	


}
	




}