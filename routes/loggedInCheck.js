module.exports = {

requireLogin :  function(req, res, next) {


  if (!req.session.user) {

  	console.log("making u relogin!!");

    res.redirect('/login');
  } else {
    next();
  }
}

}