var messageController = require("../controller/message_controller");

var loggedInCheck = require("./loggedInCheck");
var path = require("path");


//export all routes into server.js

module.exports = function(app){



// 	app.get("/login", function(req, res) {

//     res.sendFile(path.join(__dirname + "/../public/login.html"));
// });	

app.post("/leaveMessage", loggedInCheck.requireLogin, messageController.leaveMessage);

app.post("/sendMessage", loggedInCheck.requireLogin, messageController.sendMessage);




}