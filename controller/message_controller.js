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
// <<<<<<< HEAD
	

// 		// create reusable transporter object using the default SMTP transport
// 		var transporter = nodemailer.createTransport({
// 			service: 'gmail',
// 			auth: {
// 				user: 'rating.neighborhood.network@gmail.com',
// 				pass: 'utCodingCamp'
// 			}
// 		});

// 		// setup email data with unicode symbols
// 		console.log(req.body.emailAttachment);

// 		var mailOptions = {
// 			from: req.session.user.email, // sender address
// 			to: req.body.receiverEmail, // list of receivers
// 			subject: req.body.subject, // Subject line
// 			text: req.body.emailBody, // plain text body
// 			// html: '<b>Hello world ?</b>' // html body
// 		};

// 		// send mail with defined transport object
// 		transporter.sendMail(mailOptions, (error, info) => {
// 			if (error) {
// 				return console.log(error);
// 			}
			
// 			else{
// 				console.log('Message %s sent: %s', info.messageId, info.response);
// 				res.redirect("/service1");
// 			}
		
// 		});
// 	}

// =======

        var sender = req.session.user.email;// sender address
        var receiver = req.body.receiverEmail; // list of receivers
        var messageSubject = req.body.subject; // Subject line
        var message = req.body.emailBody; // plain text body

       nodeMailer(sender, receiver, messageSubject, message,
        function(info){

            res.redirect("/service1")


        });

 
}
// >>>>>>> babec461f0cc037b00dc8f5d6634b80ff4c014dd
};