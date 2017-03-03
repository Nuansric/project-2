var signupLoginController = require("../controller/signupLogin_controller");
var loggedInCheck = require("./loggedInCheck");
//export all routes into server.js


var db = require("../models");
//var signupLoginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {

app.get("/", function(req, res) {


    res.sendFile(path.join(__dirname + "/../public/home.html"));

    
});	


app.get("/signup", function(req, res) {

    res.sendFile(path.join(__dirname + "/../public/signup.html"));

    loggedInCheck.alreadyLogIn(req, res);
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
    var obj ={
		currentUser : req.session.user.firstName
	}
    res.render("landing", obj);
});
app.get("/errorPage", loggedInCheck.requireLogin, function(req, res){
	var obj ={
		currentUser : req.session.user.firstName
	}
    res.render("errorPage", obj);
})

}