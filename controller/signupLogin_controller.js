//initialize the npm packages
var crypto = require('crypto');
var qs = require('qs');
var request = require('request');
var session = require('express-session');

//import models
var db = require("../models");
//import config files
var geocode = require("../config/geoCode");

//setup the environment variable for development or production
var env = process.env.NODE_ENV || 'development';


const Client = require('authy-client').Client;

//import the API key from a local file, or ENV variable on the host
if (env === "development"){
    var config = require('../config/authyConfig.js');
    var phoneReg = require('../public/lib/phone_verification')(config.API_KEY);
    const authy = new Client({key: config.API_KEY});
}else{
    var phoneReg = require('../public/lib/phone_verification')(process.env.AUTHY_API_KEY);
    const authy = new Client({key: process.env.AUTHY_API_KEY});
}

// function to encrypt the password
function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}


// function createSession(req, res, user) {
//     req.session.regenerate(function () {
//         req.session.loggedIn = true;
//         req.session.userId = user.userId;
//         req.session.username = user.userName;
//         req.session.longitude = user.longitude;
//         req.session.latitude = user.latitude;
//         res.status(200).json();
//     });
// }


var signupLogin = {

    // This function checks whether username is Available
    checkUserName : function(req, res){
                //make a query to the database
                db.userProfile.findAll({
                    where: {userName: req.body.userName}
                }).then(function(user){

                    // console.log("user");
                    // console.log(user);
                    //if the query returns a result
                    if (user.length > 0) {
                        //Show the user that entered username is not available.
                        res.json({error: "Username is not available! Please pick a new one!"});                
                    }
                    // if no results are found 
                    else {
                        // Tell the user that the entered username is avaiable.
                        res.json({error: "Username is Available!"});
                    }
                            
                });
    },

    // Encrypt the password
    hashPW : function(pwd) {
                return crypto.createHash('sha256').update(pwd).digest('base64').toString();
            },
    //
    createNewProfile : function(req, res, coordinates, cb){

        //console.log("in createNewProfile");
        var user = req.body;

        // console.log(req.body)

        //console.log(user);
        // try{}catch(e){console.log(e.message)};

        // Make a query to the database to add a new entry
        db.userProfile.create({
            userName: user.userName,
            password: signupLogin.hashPW(user.password),
            firstName: user.firstName,
            address_1: user.address_1,
            address_2: user.address_2,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode,
            country: user.country,
            phone: user.phone,
            email: user.email,
            longitude: coordinates.longitude,
            latitude: coordinates.latitude
        }).then(function(user) {
            // run a callback function
            cb(user);
            //error handling
        }).catch(function(error){
            console.log(error);
            cb({error: error.errors[0].message});
        });
    },

    // Function to verify the user is a human being
    requestPhoneVerification : function (req, res/*, phone*/) {
        var phone_number = req.body.phone;
        var country_code = 1;
        var via = "sms";

        // console.log("body: ", req.body);

        // if the variables exists
        if (phone_number && country_code && via) {
            // var isSuccess;
            phoneReg.requestPhoneVerification(phone_number, country_code, via, function (err, response) {
                if (err) {
                    console.log('error creating phone reg request', err);
                    // res.status(500).json(err);

                    // if varification code cannot be created because
                    // of wrong phone number, then error returned
                    // is 60023
                    if(err.error_code == '60023'){
                        res.json({error: "Please re-enter your code and try again!"});
                    }else{
                    res.json({error: err.message});
                    // isSuccess = false;
                    }
                } else {
                    //console.log('Success register phone API call: ', response);
                    // res.status(200).json(response);
                    res.json(response);
                    // isSuccess = true;
                }
            });
        } else {
            //console.log('Failed in Register Phone API Call');
            // res.status(500).json({error: "Missing fields"});
            
            // Tell user to enter their number in the field
            res.json({error: "Missing fields"});
            // isSuccess = false;
        }
    },

    // Following function matches the verification geocode
    // between user entered value, and original value
    verifyPhoneToken : function (req, res){

        var country_code = 1;
        var phone_number = req.body.phone;
        var token = req.body.token;

        //console.log(phone_number);

        if (phone_number && country_code && token) {
            phoneReg.verifyPhoneToken(phone_number, country_code, token, function (err, response) {
                if (err) {
                    console.log('error creating phone reg request', err);
                    res.json({error: err.message});
                    
                } 
                else {
                    // console.log('Confirm phone success confirming code: ', response);

                    // if user is verified
                    if (response.success) {
                        
                        var address = req.body.address_1 + ", "+ req.body.city +", "+ req.body.state + ", " + req.body.zipCode + ", " + req.body.country;
                        var addressFixed = address.replace(/\s+/g,"+");

                        //console.log(addressFixed);
                        
                        // geocode the users address
                        geocode(addressFixed, function(coordinate){
                            
                            //console.log(req.session);
                            //console.log(coordinate);
                            // if coordinates are not returned
                            if(coordinate == "Not Found"){
                                // ask user to verify the address
                                res.json({error: "Please verify that your address is correct!"});
                            }
                            // if the coordinates are returned
                            else{
                                //store the coordinates in a variable    
                                var coordinates = coordinate;
                                // console.log(coordinates);

                                // call the create profile function
                                signupLogin.createNewProfile(req, res, coordinates, function(user){
                                    //if the profile is successfuly created
                                    if(!user.error){

                                        // console.log("after created");
                                        //reroute the user to the login page
                                        res.send("/login");
                                            
                                    }
                                    // if an error is return. return error
                                    else if (user.error) {
                                            // console.log(user.error);
                                            res.json({error: user.error});     
                                    }
                                });
                            }          
                        });                                    
                    }
                    else {
                        
                        //console.log('Failed in Confirm Phone request body: ', response.message);
                        // if user verification fails, ask the user to try again.
                        res.json({error: response.message + ". Please try again."});
                    }
                }
            });
        }
    },

    // createNewProfile : function(req, res/*, geoCode*/){
    //  var user = req.body;

    //  db.userProfile.create({
    //      userName: user.userName,
    //      password: this.hashPW(user.password),
    //      firstName: user.firstName,
    //      address_1: user.address_1,
    //      address_2: user.address_2,
    //      city: user.city,
    //      state: user.state,
    //      zipCode: user.zipCode,
    //      country: user.country,
    //      phone: user.phone,
    //      email: user.email,
    //      longitude: -95.543191,
    //      latitude: 29.558719
    //  }).then(function(err, user) {

    //       if (err) {
    //             res.json({error: "Your Information is invalid!"});
                
    //       }
    //       if(user){
                
    //             createSession(req, res, user);

    //          res.render("landing");
                
    //       }
        
    //     });
    // },

    loggedIn : function(req, res){

        //console.log("logging in");
        // console.log(req.headers);

        // encrypt the user entered password on the login page, for security.
        var enteredPassword = signupLogin.hashPW(req.body.password);

        // var key = req.headers.cookie.split(";")[1].substring(9);
        // var sessionKey = (key.length > 75?key.substring(0, 74):key);
        // if(req.session.views==undefined){
        //     req.session.views ={};
        // }
        // if(req.session.views[sessionKey]==null){
        //     req.session.views[sessionKey]={
        //         userProfile: 1,
        //         userName: "chanita"
        //     };
        // }

        // console.log(req.session.views[sessionKey]);
        
        // Make a query to database to find the username
        db.userProfile.findOne({
            where:{userName: req.body.userName}
        }).then(function(user) {

            // console.log(user);
            // if no results are returned
            if (user == null || user == undefined ) {
                // tell the user that username is not found
                res.json({error: "Username is not found!"});
                
            }
            // if user is found
            else{
                // compare the password the user entered on the login screen
                // to the password stored in the database.
                // if passwords do not match
                if (enteredPassword !== user.password){
                        // tell the user that the passwords do not match
                        res.json({error: "The pasword you've entered is incorrect. Please try again."});
                } 
                else {
                        //store user's information in a variable to be stored as cookies
                        var currentUser = {
                            userId: user.userId,
                            userName : user.userName,
                            firstName : user.firstName,
                            longitude : user.longitude,
                            latitude: user.latitude,
                            email: user.email
                        }

                        //console.log(currentUser);

                        req.session.user = currentUser;
                        res.locals.user = currentUser;

                        // console.log("res.session.user");
                        // console.log(req.session.user);
                        // console.log(res.locals.user);

                        // send the user to the landing page
                        res.send('/landing');

                        // console.log("after landing");

                        // createSession(req, res, user);
                        // res.render("landing");
                }
            }
            // if (err) {

            //     res.status(500).json({error: "An error occur, please try again!"});
            // }

            // error handling
        }).catch(function(error){
            console.log(error);
            res.json({error: "We are experiencing technical difficulties. Please try again."});
        });   
    }
};

module.exports = signupLogin;