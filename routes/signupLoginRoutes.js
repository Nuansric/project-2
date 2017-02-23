var signupLoginController = require("../controller/signupLogin_controller");

//export all routes into server.js


var db = require("../models");
//var signupLoginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {

app.get("/signup", function(req, res) {

    res.sendFile(path.join(__dirname + "/../public/signup.html"));
});	
app.get("/login", function(req, res) {

    res.sendFile(path.join(__dirname + "/../public/login.html"));
});	

app.post("/loggedIn", signupLoginController.loggedIn);



app.post("/checkUserName", signupLoginController.checkUserName);


app.post("/requestSms", signupLoginController.requestPhoneVerification);


app.post("/createProfile", signupLoginController.verifyPhoneToken);

}