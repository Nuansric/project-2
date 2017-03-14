var messageController = require("../controller/message_controller");

var loggedInCheck = require("./loggedInCheck");

var path = require("path");

//export all routes into server.js

module.exports = function(app){

    // get route to show the user e-mail page
    // app.get("/form", function(req, res) {
    //     //console.log(req);
    //     res.sendFile(path.join(__dirname + "/../public/sendEmail.html"));
    // });	

    app.get("/sign", function(req, res) {
        // when user presses the send button
        app.post("/sendMessage", loggedInCheck.requireLogin, messageController.sendMessage);

        res.sendFile(path.join(__dirname + "/../public/signup.html"));
    });	

    // 	app.get("/login", function(req, res) {

    //     res.sendFile(path.join(__dirname + "/../public/login.html"));
    // });

    // app.post("/leaveMessage", loggedInCheck.requireLogin, messageController.leaveMessage);

    app.get("/leaveMessage", messageController.leaveMessage);

    // app.post("/leaveMessage", messageController.leaveMessage);

}