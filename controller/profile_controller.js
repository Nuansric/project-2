var db = require("../models");

module.exports = {

	renderProfilePage: function(req, res){

		console.log("inside profile");
		console.log(req.session.user);

		db.userProfile.findOne({
	        where:{userId: req.session.user.userId},
			include: [db.userService]
    	}).then(function(user) {

	    	console.log("inside then");
	    	console.log(user);
	    	console.log(JSON.stringify(user.userServices, 2, null));

	    		var userObject = {
	      			currentUser: user
	    	};

	    	res.render("profile", userObject);

	        
	       
	   		 }).catch(function(error){
	        console.log(error);
	        res.json({error: "We are experiencing technical difficulty. Please try again..."});

    });
},

deleteAccount: function(req, res){
	console.log(req.session.user);

	db.userProfile.destroy({
	        where:{userId: req.session.user.userId},
			
    	}).then(function(user) {
    		req.session.reset();
    		console.log("ALREADY DELETED");

    		res.redirect("/");

    	}).catch(function(error){
	        console.log(error);
	        res.json({error: "We are experiencing technical difficulty. Please try again..."});

    });


},

signout: function(req, res){
req.session.reset();
console.log("signed out!")
  res.redirect('/');

}
	
}