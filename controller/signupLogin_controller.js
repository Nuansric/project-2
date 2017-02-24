var crypto = require('crypto');
var db = require("../models");

var config = require('../config/authyConfig.js');
var qs = require('qs');
var request = require('request');
var phoneReg = require('../public/lib/phone_verification')(config.API_KEY);
var session = require('express-session');

// https://github.com/seegno/authy-client
const Client = require('authy-client').Client;
const authy = new Client({key: config.API_KEY});


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

checkUserName : function(req, res){

            db.userProfile.findAll({
                 where: {userName: req.body.userName}
            }).then(function(user){

                if (user == null || user == undefined ) {

                         res.json({error: "Username is Available!"});
                         
              
                 }
                else if (user){
                    
                    res.json({error: "Username is not available! Please pick a new one!"});
                    
                }
                        
            });

                    

},
hashPW : function(pwd) {
            return crypto.createHash('sha256').update(pwd).digest('base64').toString();
        },

createNewProfile : function(req, res, cb){

    console.log("in createNewProfile");
    var user = req.body;

    // console.log(req.body)

    console.log(user);
    // try{

    //     db.userProfile.create({
    //     userName: user.userName,
    //     password: signupLogin.hashPW(user.password),
    //     firstName: user.firstName,
    //     address_1: user.address_1,
    //     address_2: user.address_2,
    //     city: user.city,
    //     state: user.state,
    //     zipCode: user.zipCode,
    //     country: user.country,
    //     phone: user.phone,
    //     email: user.email,
    //     longitude: -95.543191,
    //     latitude: 29.558719
    // }).then(function(user) {
         
    //      cb(user);
       
    // });


    // }catch(e){console.log(e.message)};

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
        longitude: -95.543191,
        latitude: 29.558719
    }).then(function(user) {
         
         cb(user);
       
    }).catch(function(error){
        console.log(error);
        cb({error: error.errors[0].message});
    })
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
                res.json({error: err.message});
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

verifyPhoneToken : function (req, res){

    var country_code = 1;
    var phone_number = req.body.phone;
    var token = req.body.token;

    console.log(phone_number);

    
    if (phone_number && country_code && token) {
        phoneReg.verifyPhoneToken(phone_number, country_code, token, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                res.json({error: err.message});
                
            } else {
                    console.log('Confirm phone success confirming code: ', response);
                    if (response.success) {
                        
                                               // var address = req.body.address_1 + ", "+ req.body.city +", "+ req.body.state + ", " + req.body.zipCode + ", " + req.body.country;
                        // var addressFixed = address.replace(/\s+/g,"+");


                    //     geocode(addressFixed, function(res){
                    //             console.log(req.session);
                     
                                
  
                    //                 var coordinates = res;

                    //                    signupLogin.createNewProfile(req.body, coordinates, function(user){
                                
                                
                    //                  if(user){

                    //                     console.log("before rendering");

                    //                     console.log(req.session);
                                        
                    //                     createSession(req, res, user);

                    //                     console.log(req.session.userId);

                    //                     res.render("landing");
                                        
                    //                  }else if (user == null || user == undefined) {
                    //                     res.json({error: "Your Information is invalid!"});
                                        
                    //                  }

                    //       });
                              
                                
  
                    // });


                          signupLogin.createNewProfile(req, res, function(user){
                                
                                
                                     if(!user.error){

                                        console.log("before rendering");

                                        // console.log(req.session);
                                        
                                        // createSession(req, res, user);

                                        // console.log(req.session.userId);

                                        res.render("landing");
                                        
                                     }else if (user.error) {
                                        console.log(user.error);
                                        res.json({error: user.error});
                                        
                                     }

                          });

                            // if (profileCreated){

                            //     res.render("landing");

                            //     res.status(200).json(response);
                            // }
                                
                        }else {
                        
                        console.log('Failed in Confirm Phone request body: ', response.message);
                        res.json({error: response.message});
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

    var enteredPassword = this.hashPW(req.body.password);


    db.userProfile.findOne({
        where:{userName: req.body.userName}
    }).then(function(user) {
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
        // if (err) {

        //     res.status(500).json({error: "An error occur, please try again!"});
        // }
    }).catch(function(error){
        console.log(error);
        res.json({error: error.errors.message});

    });
    
}


}

function createSession(req, res, user) {
    req.session.regenerate(function () {
        req.session.loggedIn = true;
        req.session.userId = user.userId;
        req.session.username = user.userName;
        req.session.longitude = user.longitude;
        req.session.latitude = user.latitude;
        res.status(200).json();
    });
}

module.exports = signupLogin;
