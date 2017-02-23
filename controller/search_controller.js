var db = require("../models");

/*
IF FOUND

Executing (default): CALL getDistance(1,-95.629029,29.6088509)
[
  [
    {
      "id": 2,
      "name": "neighbor1",
      "longitude": -95.627787,
      "latitude": 29.6093574
    },
    {
      "id": 4,
      "name": "neighbor2",
      "longitude": -95.628787,
      "latitude": 29.6088507
    }
  ],
  {
    "fieldCount": 0,
    "affectedRows": 0,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
  }
]

IF NOT

Executing (default): CALL getDistance(3,-95.543191,29.558719)
[
  [],
  {
    "fieldCount": 0,
    "affectedRows": 0,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
  }
]



*/

module.exports = {

renderSearchBar : function(req, res){

	db.serviceOffer.findAll({}).then(function(data){

		var serviceObject = {
      			services: data
    	};

    	// console.log(serviceObject);

    	// console.log("HHHH"+ serviceObject.services[0].dataValues.serviceName);

    	res.render("search", serviceObject);

	})
},

findService : function(req, res){

		var serviceID = req.body.serviceId;

		console.log(req.body);

		var currentUserId = req.session.userId;

		var userLon = req.session.longitude;

		var userLat = req.session.latitude;

		var userInDistance = [];

  		db.getDistance(currentUserId, userLon, userLat, function(result){
  				
  				console.log(JSON.stringify(result, null, 2));

  				var userData = result[0];

          		console.log("userID " + JSON.stringify(userData[0], null, 2))

  		        for(var i=0; i < userData.length; i++){

  		      		  userInDistance.push(userData[i].id);
  				}

          		console.log(userInDistance);
      	});

    console.log(userInDistance);

        if(userInDistance.length > 0){

           		 db.userProfile.findAll({
    			
    					where: {
    		        			userId: userInDistance
    		      				},
    		      		include: [{
    		        				model: userService,
    		        				where: { serviceId: serviceID}
    		    		}]


           		 }).then(function(result) {
          			var serviceFound = {
          				neighborFound: data
        			   };

        			res.render("service", serviceFound);

        		});
    		
		    }else{

              var serviceFound = {
                  neighborFound: "None of your neighbor is a member of Neighborhood Network"
                 };

              res.render("service", serviceFound);

		    }


}
	




}