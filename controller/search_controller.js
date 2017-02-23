var db = require("../models");

module.exports = {

renderSearchBar : function(req, res){

	db.serviceOffer.findAll({}).then(function(data){

		var serviceObject = {
      			services: data
    	};

    	console.log(serviceObject);

    	console.log("HHHH"+ serviceObject.services[0].dataValues.serviceName);

    	res.render("search", serviceObject);

	})
}
	
}