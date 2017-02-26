module.exports = {

requireLogin :  function(req, res, next) {


  if (!req.session.user) {

  	console.log("making u relogin!!");

    res.redirect('/login');
  } else {
    next();
  }
},

alreadyLogIn: function(req, res){
if (req.session.user) {

	console.log(req.session.user);

    res.redirect('/landing');
  } 

}

}