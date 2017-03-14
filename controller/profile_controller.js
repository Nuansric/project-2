// import models
var db = require("../models");

module.exports = {

	//this function shows the profile page.
	renderProfilePage: function(req, res){

		// console.log("inside profile");
		// console.log(req.session.user);

		// find user profile from the database
		db.userProfile.findOne({
			// where userId matches the current user's username
	        where:{userId: req.session.user.userId},
			// include information about the services that the user provides.
			include: [db.userService]
    	}).then(function(user) {

	    	// console.log("inside then");
	    	// console.log(user);
	    	// console.log(JSON.stringify(user.userServices, 2, null));
				//store current users information in the cookie
				var userObject = {
					currentUserInfo: user,
					currentUser : req.session.user.firstName
				};
				//show the profile page
	    		res.render("profile", userObject);
				//error handling
	   		 }).catch(function(error){
	        		console.log(error);
	        		res.redirect("/errorPage")
    			});
	},
	// Following function deletes the user from the database
	deleteAccount: function(req, res){
		console.log(req.session.user);
		// delete the database
		db.userProfile.destroy({
				where:{userId: req.session.user.userId},
				
		}).then(function(user) {
				req.session.reset();
				// console.log("ALREADY DELETED");
				
				// redirect the user to the homepage
				res.redirect("/");
			// error handling
			}).catch(function(error){
					console.log(error);
					res.redirect("/errorPage")
				});
	},
	// The following function helps the user signout
	// , and redirects them to the homepage.
	signout: function(req, res){
		//reset the session variables (cookies)
		req.session.reset();
		// console.log("signed out!");
		res.redirect('/');
	}
	
}