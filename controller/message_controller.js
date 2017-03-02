


var db = require("../models");

var nodeMailer = require("../config/nodeMailer")


module.exports = {

	leaveMessage : function(req, res){
		var objectRec = {
			receiverInfo : req.body,
			currentUser : req.session.user.firstName
		}

		res.render("messageForm", objectRec);
		

	},

	sendMessage : function(req, res){

		console.log(req.body);

        var sender = req.session.user.email;// sender address
        var receiver = req.body.receiverEmail; // list of receivers
        var messageSubject = req.body.subject; // Subject line
        var message = req.body.emailBody; // plain text body

       nodeMailer(sender, receiver, messageSubject, message,
        function(info){

            res.redirect("/service1")


        });

 
}
};