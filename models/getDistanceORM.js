// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelizeConnection = require("../config/connection.js");

var userProfile = require("./userProfileORM.js");

// var getDistance =function (userID , lon, lat, cb){
	 
// 		 sequelizeConnection.query('CALL getDistance('+ userID +',' + lon + ',' + lat+')', {
// 	model: userProfile})
// 	.then(function(data){
// 	  			cb(data);
// 	});
// }




// module.exports = getDistance;


module.exports = function(sequelize, DataTypes){
	var getDistance = function (userID , lon, lat, cb){
		 
		sequelize.query('CALL getDistance('+ userID +',' + lon + ',' + lat+')', {
		model: userProfile})
		.then(function(data){
		  	cb(data);

		  	console.log("inside getdistance");
		  	console.log(json.stringify(data, 2, null));
		});
	}

	return getDistance;

}





