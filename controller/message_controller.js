var db = require("../models");

module.exports = {

	leaveMessage : function(req, res){
		console.log(req.body);
		console.log(req.session.user);
		// { receiverId: '3', receiverEmail: 'chaita_n@icloud.com' }
		

	}
	
}