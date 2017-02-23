//EXPRESS ROUTES GOES HERE
var express = require("express");

var router = express.Router();

var findGeoCode = require("../config/geoCode")

var db = require("../models");
// var loginSignup = require("./login-signup.js");
var current_userID;
var lat1;
var lon1;

// var getDistance= require("../Model/getDistanceORM.js");



// router.get("/", function(req, res) {
  	
//   	var results = getDistance(userID, userLon, userLat, function(result){


// 		console.log(JSON.stringify(result, null, 2));

//   	});


// });
// wrap this in the /service/id: routes.... will split out the user who lives within disctance
// router.get("/", function(req, res) {
  	
//   	var results = db.getDistance(userID, userLon, userLat, function(result){


// 		console.log(JSON.stringify(result, null, 2));

//   	});

// });


// router.post("/checkUserName", function(req, res){

// 	var userFound = loginSignup.checkUserName(req.body.userName);

// 	if(userFound.length > 0){
// 		res.json(true);
// 	}else{
// 		res.json(false);

// 	}
// });

// router.post("/createProfile", function(req, res){
// 	var verifyPhone ={
// 		isSent : true,
// 		isCorrect: false,
// 		isCreated: true
// 	}

// 	var address = req.bod.address_1 + "+" + req.body.city + "+" + req.body.state + "+" + req.body.zipCode + "+" + req.body.country;

// 	var requestText = loginSignup.requestPhoneVerification(req, res, req.body.phone);

// 	if (requestText) {

// 	var verifyToken = loginSignup.verifyPhoneToken(req, res, req.body.phone, req.body.token)

// 		if (verifyToken){

// 			var geoCode = findGeoCode(address);

// 			var profileCreated = loginSignup.createNewProfile(req.body, geoCode);

// 			if (profileCreated){
// 			res.render("landing");
// 			}else{
				
// 				isCreated = false;
// 			}

// 		}else{

// 			isCorrect = false;

// 		}

// 	}else{
// 		verifyPhone.isSent = false;
// 	}

// 	res.json(verifyPhone);

// })










module.exports = router;