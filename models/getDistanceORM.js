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
	var getDistance = function (userID , lon, lat, serviceId, cb){
		 
		sequelize.query('CALL getDistance('+ userID +',' + lon + ',' + lat + ',' + serviceId +')', {
		type: sequelize.QueryTypes.RAW,
		model: {

userId:{
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
},
userName: {
    type: DataTypes.STRING
    , unique: true
    , allowNull: false,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [5, 15]
      }

  },
firstName: {
    type: DataTypes.STRING
     , allowNull: false,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [1, 20]
      }
  },
phone: {
    type: DataTypes.STRING
    , unique: true
    , allowNull: false,
    validate: {
        len: [10, 10]
      }
  },
email: {
    type: DataTypes.STRING
     , unique: true
    , allowNull: false,
    validate: {
        len: [1, 50]
      }

  },
description:{
		type: DataTypes.TEXT,
    	allowNull: false
    
},
discount:{
		type: DataTypes.BOOLEAN,
    	allowNull: false
    

},
serviceOfferServiceId:{
		type: DataTypes.INTEGER,
    	allowNull: false

},
userProfileUserId:{
		type: DataTypes.INTEGER,
    	allowNull: false
   
},
serviceName:{
    type: DataTypes.STRING,
      allowNull: false
   
}


}




	})
		.then(function(data){
		  	cb(data);

		  	
		}).catch(function(error){
			console.log(error);
		});
	}

	return getDistance;

}





