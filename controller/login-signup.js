var crypto = require('crypto');
var db = require("../models");

var config = require('../config/authyConfig.js');
var qs = require('qs');
var request = require('request');
var phoneReg = require('../lib/phone_verification')(config.API_KEY);

// https://github.com/seegno/authy-client
const Client = require('authy-client').Client;
const authy = new Client({key: config.API_KEY});


function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

var loginSigup = {

checkUserName : function(userNameCheck){

					var userFound;

					db.userProfile.findAll({
						where: {userName: userNameCheck}
					}).then(function(dbUser) {
      					userFound = dbUser;
    				});

					return userFound;

				},
hashPW : function(pwd) {
    		return crypto.createHash('sha256').update(pwd).digest('base64').toString();
		},

requestPhoneVerification : function (req, res, phone) {
    var phone_number = phone;
    var country_code = "1";
    var via = "sms";

    // console.log("body: ", req.body);

    if (phone_number && country_code && via) {
    	var isSuccess;
        phoneReg.requestPhoneVerification(phone_number, country_code, via, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                res.status(500).json(err);
                isSuccess = false;
            } else {
                console.log('Success register phone API call: ', response);
                res.status(200).json(response);
                isSuccess = true;
            }
        });
    } else {
        console.log('Failed in Register Phone API Call');
        res.status(500).json({error: "Missing fields"});
        isSuccess = false;
    }
return isSuccess;

},

verifyPhoneToken : function (req, res, phone, token) {
    var country_code = "1";
    var phone_number = phone;
    var token = token;
    var isCorrect;
    
    if (phone_number && country_code && token) {
        phoneReg.verifyPhoneToken(phone_number, country_code, token, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                res.status(500).json(err);
                isCorrect = false;
            } else {
                console.log('Confirm phone success confirming code: ', response);
                if (response.success) {
                    // req.session.ph_verified = true;
                    isCorrect = true;
                }
                res.status(200).json(response);
            }

        });
    } else {
    	isCorrect = false;
        console.log('Failed in Confirm Phone request body: ', req.body);
        res.status(500).json({error: "Missing fields"});
    }
return isCorrect;

},

createNewProfile : function(userInput, geoCode){
	var user = userInput;
	var isCreated;

	userProfile.create({
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
		 	isCreated = false;
		 }
		 if(user){
		 	isCreated = true;
		 	 res.json(user);
		 }
       
    });
return isCreated;
},



}