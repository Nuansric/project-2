var signupLoginController = require("../controller/signupLogin_controller");
var loggedInCheck = require("./loggedInCheck");
//export all routes into server.js


var db = require("../models");
//var signupLoginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {

    app.get("/", function(req, res) {

        //default route to homepage
        res.sendFile(path.join(__dirname + "/../public/home.html"));

        
    });	

    // route to show the user signup page
    app.get("/signup", function(req, res) {

        res.sendFile(path.join(__dirname + "/../public/signup.html"));
        loggedInCheck.alreadyLogIn(req, res);

    });	

    // route to take the user to the login page
    app.get("/login", function(req, res) {

        res.sendFile(path.join(__dirname + "/../public/login.html"));

        loggedInCheck.alreadyLogIn(req, res);
    });	

    app.post("/loggedIn", signupLoginController.loggedIn);


    app.post("/checkUserName", signupLoginController.checkUserName);


    app.post("/requestSms", signupLoginController.requestPhoneVerification);


    app.post("/createProfile", signupLoginController.verifyPhoneToken);


    // once user logs in, take them to landing page
    app.get("/landing", loggedInCheck.requireLogin, function(req, res){
        var obj ={
            currentUser : req.session.user.firstName
        };
        res.render("landing", obj);
    });

    // error page for any errors encountered
    app.get("/errorPage", loggedInCheck.requireLogin, function(req, res){
        var obj ={
            currentUser : req.session.user.firstName
        };
        res.render("errorPage", obj);
    });

};