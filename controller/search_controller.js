var db = require("../models");


module.exports = {
	// the following function renders available services
	renderSearchBar : function(req, res){

		db.serviceOffer.findAll({}).then(function(data){

			var serviceObject = {
					services: data,
					currentUser : req.session.user.firstName
				};

			// console.log("inside search");

			// console.log(req.session.user);
			// console.log(serviceObject);

			// console.log("HHHH"+ serviceObject.services[0].dataValues.serviceName);

			res.render("search", serviceObject);
		});
	},
	// following function returns the results for the user specified service
	findService : function(req, res){
		// If the user does not input the category, set the cookie equal to its old value,
		// else reset it to the new one that the user passed in
		
		// if req.body.serviceId == undefined
		// then req.session.user.selectedService = req.session.user.selectedService
		// else req.session.user.selectedService = req.body.serviceId.
		req.session.user.selectedService = (req.body.serviceId == undefined?req.session.user.selectedService:req.body.serviceId);
		var serviceID = req.session.user.selectedService;

		// console.log(req.session.user);

		// console.log(req.body);

		// store the values from the current session(cookies) to variables.
		var currentUserId = req.session.user.userId;

		var userLon = req.session.user.longitude;

		var userLat = req.session.user.latitude;

		// make a database query to find the user specified services using
		// the user's coordinates. upon getting the results
		db.getDistance(currentUserId, userLon, userLat, serviceID, function(result){
			
			// console.log("getDistance result");
			// console.log(JSON.stringify(result, null, 2));
			// if results are returned
			if(result.length > 0){
				// store the results in a variable
				var serviceFound = {
				
				neighborFound: result,
				serviceName: result[0].serviceName,
				currentUser : req.session.user.firstName
				};
				// render them to the service page
				res.render("service", serviceFound);

			}else{
				// if results are not returned
				var noServiceFound = {
					
					currentUser : req.session.user.firstName
					};
				// redirect user to "noService" page.
				res.render("noService", noServiceFound);
			}
		});
	}
};