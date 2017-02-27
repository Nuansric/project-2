var messageController = require("../controller/message_controller");

var loggedInCheck = require("./loggedInCheck");


//export all routes into server.js

module.exports = function(app){

app.get("/messageinbox", function (request, response){
    response.render('messageInbox')
});

// 	app.get("/login", function(req, res) {

//     res.sendFile(path.join(__dirname + "/../public/login.html"));
// });	

app.post("/leaveMessage", loggedInCheck.requireLogin, messageController.leaveMessage);






}