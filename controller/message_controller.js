//import database
var db = require("../models");
//import the functions from nodeMailer.js file
var nodeMailer = require("../config/nodeMailer")


module.exports = {

	//leave message pulls the current user information and stores it in a variable
	leaveMessage : function(req, res){

		var objectRec = {
			receiverInfo : req.body,
			currentUser : req.session.user.firstName
		}

		//render the message form page, where user can write a message.
		res.render("messageForm", objectRec);

	},

	// send message takes the user's information and the e-mail message, and passes it 
	// to function in the nodeMailer.js file to be processed by nodemailer.
	sendMessage : function(req, res){

		// console.log(req.body);

        var sender = req.session.user.email;// sender address
        var receiver = req.body.receiverEmail; // list of receivers
        var messageSubject = req.body.subject; // Subject line
        var message = req.body.emailBody; // plain text body

		// run nodemailer function
    	nodeMailer(sender, receiver, messageSubject, message,
        function(info){

			//When the mail is send, redirect the user to the service page
            res.redirect("/service1");

        });

	}

};