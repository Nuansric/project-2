var crypto = require('crypto');
var db = require("../models");

var config = require('../config/authyConfig.js');
var qs = require('qs');
var request = require('request');
var phoneReg = require('../public/lib/phone_verification')(config.API_KEY);

// https://github.com/seegno/authy-client
const Client = require('authy-client').Client;
const authy = new Client({key: config.API_KEY});


function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

module.exports = {

checkUserName : function(req, res){

			db.userProfile.findAll({
			     where: {userName: req.body.userName}
			}).then(function(err, user){

                if (user == null || user == undefined ) {

                         res.json({error: "Username is Available!"});
                         
                }else if (err) {
                    res.json({error: "There is an error, please try again."});
                    
                 }
                else if (user){
                    
                    createSession(req, res, user);

                    res.json({error: "Username is not available! Please pick a new one!"});
                    
                }
      					
    		});

					

},
hashPW : function(pwd) {
    		return crypto.createHash('sha256').update(pwd).digest('base64').toString();
		},

requestPhoneVerification : function (req, res/*, phone*/) {
    var phone_number = req.body.phone;
    var country_code = 1;
    var via = "sms";

    // console.log("body: ", req.body);

    if (phone_number && country_code && via) {
    	// var isSuccess;
        phoneReg.requestPhoneVerification(phone_number, country_code, via, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                // res.status(500).json(err);
                res.json(err);
                // isSuccess = false;
            } else {
                console.log('Success register phone API call: ', response);
                // res.status(200).json(response);
                res.json(response);
                // isSuccess = true;
            }
        });
    } else {
        console.log('Failed in Register Phone API Call');
        // res.status(500).json({error: "Missing fields"});
         res.json({error: "Missing fields"});
        // isSuccess = false;
    }
// return isSuccess;

},

verifyPhoneToken : function (req, res/*, phone, token*/){

    var country_code = 1;
    var phone_number = req.body.phone;
    var token = req.body.token;

    
    if (phone_number && country_code && token) {
        phoneReg.verifyPhoneToken(phone_number, country_code, token, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                res.status(500).json({error: err.message});
                
            } else {
                    console.log('Confirm phone success confirming code: ', response);
                    if (response.success) {
                        
                        // var address = req.body.address_1 + ", "+ req.body.city +", "+ req.body.state + ", " + req.body.zipCode + ", " + req.body.country;
                        // var addressFixed = address.replace(/\s+/g,"+");

                        // var geoCode = findGeoCode(addressFixed);

                        this.loginSignup.createNewProfile(req, res/*, geoCode*/);

                            // if (profileCreated){

                            //     res.render("landing");

                            //     res.status(200).json(response);
                            // }
                                
                        }else {
                    	
                        console.log('Failed in Confirm Phone request body: ', response.message);
                        res.status(500).json({error: response.message});
                        }
            }
        });
    }
},

createNewProfile : function(req, res/*, geoCode*/){
	var user = req.body;

	db.userProfile.create({
		userName: user.userName,
		password: this.hashPW(user.password),
		firstName: user.firstName,
		address_1: user.address_1,
		address_2: user.address_2,
		city: user.city,
		state: user.state,
		zipCode: user.zipCode,
		country: user.country,
		phone: user.phone,
		email: user.email,
		longitude: geoCode.longitude,
		latitude: geoCode.latitude
	}).then(function(err, user) {

		 if (err) {
            res.json({error: "Your Information is invalid!"});
		 	
		 }
		 if(user){
            
            createSession(req, res, user);

		 	res.render("landing");
            
		 }
       
    });
},

loggedIn : function(req, res){

    var enteredPassword = this.hashPW(req.body.password);


    db.userProfile.findOne({
        where:{userName: req.body.userName}
    }).then(function(err, user) {
         if (user == null || user == undefined ) {

            res.json({error: "Username is not found!"});
            
        }else if(user){

                if (enteredPassword !== user.password)
                {
                    res.json({error: "Your username and password do not match!"});
                } else {
                    createSession(req, res, user);
                    res.render("landing");
                }
        }
        if (err) {

            res.status(500).json({error: "An error occur, please try again!"});
        }
    });
    
}


}

function createSession(req, res, user) {
    req.session.regenerate(function () {
        req.session.loggedIn = true;
        req.session.user = user.userId;
        req.session.username = user.userName;
        req.session.longitude = user.longitude;
        req.session.latitude = user.latitude;
        res.status(200).json();
    });
}