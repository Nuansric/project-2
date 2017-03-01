


var db = require("../models");

var nodemailer = require("nodemailer");

var bunyan = require("bunyan");

module.exports = {

	leaveMessage : function(req, res){
		var objectRec = {
			receiverInfo : req.body
		}

		res.render("messageForm", objectRec);
		

	},

	sendMessage : function(req, res){

		console.log(req.body);
	

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rating.neighborhood.network@gmail.com',
        pass: 'utCodingCamp'
    }
});

// setup email data with unicode symbols
var mailOptions = {
    from: req.session.user.email, // sender address
    to: req.body.receiverEmail, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.emailBody, // plain text body
    // html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }else{
 console.log('Message %s sent: %s', info.messageId, info.response);
    	res.redirect("/service1")
    }
   
});
}
};