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

    console.log("inside search");

    console.log(req.session.user);
    	// console.log(serviceObject);

    	// console.log("HHHH"+ serviceObject.services[0].dataValues.serviceName);

    	res.render("search", serviceObject);

	})
},

findService : function(req, res){

		var serviceID = req.body.serviceId;

		console.log(req.body);

		var currentUserId = req.session.user.userId;

		var userLon = req.session.user.longitude;

		var userLat = req.session.user.latitude;

		var userInDistance = [];

  		db.getDistance(currentUserId, userLon, userLat, serviceID, function(result){
  				
          console.log("getDistance result");
  				console.log(JSON.stringify(result, null, 2));
/*
        if(result.length > 0){
          	
  		        for(var i=0; i < result.length; i++){

  		      		  userInDistance.push(result[i].userId);
                    console.log("getDistance result array");
                    console.log(userInDistance);
  				  }
          } 
          else{
            res.render("noService");
          } 

          */  
            if(result.length > 0){


                var serviceFound = {
                  
                  neighborFound: result,
                  serviceName: result[0].serviceName
                };

                 res.render("service", serviceFound);




            }else{

                res.render("noService", serviceFound);
            }




});




      //   if(userInDistance.length > 0){

      //      		 db.userProfile.findAll({
    			
    		// 			where: {
    		//         			userId: userInDistance
    		//       				},
    		//       		include: [{
    		//         				model: db.userService,
    		//         				where: { serviceId: serviceID}
    		//     		}]


      //      		 }).then(function(result) {
      //     			var serviceFound = {
      //     				neighborFound: data
      //   			   };

      //   			res.render("service", serviceFound);

      //   		});
    		
		    // }else{

      //         var serviceFound = {
      //             neighborFound: "None of your neighbor is a member of Neighborhood Network"
      //            };

      //         res.render("noService", serviceFound);

		    // }
}
}
