//EXPRESS ROUTES GOES HERE
var express = require("express");

var router = express.Router();

var db = require("../models");

var current_userID;
var lat1;
var lon1;

// var getDistance= require("../Model/getDistanceORM.js");



// router.get("/", function(req, res) {
  	
//   	var results = getDistance(userID, userLon, userLat, function(result){


// 		console.log(JSON.stringify(result, null, 2));

//   	});


// });

router.get("/", function(req, res) {
  	
  	var results = db.getDistance(userID, userLon, userLat, function(result){


		console.log(JSON.stringify(result, null, 2));

  	});


});

module.exports = router;