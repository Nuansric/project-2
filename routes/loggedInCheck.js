module.exports = {

  // function to allow user to login if the session has expired
  requireLogin :  function(req, res, next) {

    // if cookie is expired
    if (!req.session.user) {
      
      //console.log("making u relogin!!");
      //redirect the user to the login page
      res.redirect('/login');
    }
    else {
      //move on
      next();
    }
  },

  // if session has not expired(user information is still in the cookie)
  alreadyLogIn: function(req, res){

    if (req.session.user) {
      //console.log(req.session.user);
      // take the user to the landing page
      res.redirect('/landing');
    } 

  }

};