var signupLoginController = require("../controller/signupLogin_controller");
var loggedInCheck = require("./loggedInCheck");
//export all routes into server.js


var db = require("../models");
//var signupLoginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {

app.get("/", function(req, res) {


    res.sendFile(path.join(__dirname + "/../public/home.html"));

    console.log(req.session.user);
});	


app.get("/signup", function(req, res) {

    res.sendFile(path.join(__dirname + "/../public/signup.html"));
});	
app.get("/login", function(req, res) {

    res.sendFile(path.join(__dirname + "/../public/login.html"));

    loggedInCheck.alreadyLogIn(req, res);
});	

app.post("/loggedIn", signupLoginController.loggedIn);



app.post("/checkUserName", signupLoginController.checkUserName);


app.post("/requestSms", signupLoginController.requestPhoneVerification);


app.post("/createProfile", signupLoginController.verifyPhoneToken);

app.get("/landing", loggedInCheck.requireLogin, function(req, res){
    res.render("landing");
})

}