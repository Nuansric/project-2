var nodemailer = require("nodemailer");

var bunyan = require("bunyan");

module.exports = function(sender, receiver, messageSubject, message, cb){

console.log("inside node mailer");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'donotreply.neighbor.network@gmail.com',
        pass: 'utCodingCamp'
    }
});

// setup email data with unicode symbols
var mailOptions = {
    from: sender, // sender address
    to: receiver, // list of receivers
    subject: messageSubject, // Subject line
    text: message + "\nPlease Reply to: " + sender, // plain text body
    // html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }else{

 		cb(info);
 		console.log('Message %s sent: %s', info.messageId, info.response);
    	
    	

    }
   
});



}