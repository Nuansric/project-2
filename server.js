// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var methodOverride = require("method-override");
var session = require('client-sessions');
var exphbs = require("express-handlebars");


// =============================================================

//initializing the node application 
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Making all the files in the public folder available for online deployment
app.use(express.static("public"));

// Allows the app to use PUT and DELETE methods
app.use(methodOverride("_method"));

// sets up handlebars to deploy HTML pages
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express App
app.set('trust proxy', "1") ;
// Session npm is used to track cookies
app.use(session({
  cookieName: 'session', //name to be referenced when calling for information from the cookie
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8', // random unguessable string
  duration: 60 * 60 * 1000, // duration for which the cookie will be stored
  activeDuration: 30 * 60 * 1000, // duration for which the cookie will be installed if the session is inactive
  httpOnly: true, // cookie is not accessible from Javascript
  secure: true, //cookie will only be sent over SSL.
  ephemeral: true //cookie expires when the browser is closed
}));

//setting up the cookies
app.use(function(req, res, next) {

  // if there is user logged in
  if (req.session && req.session.user) {
     // find the profile in the database
     db.userProfile.findOne({
        where:{userName: req.body.userName}
    }).then(function(user) {
      if (user) {
        //assign the profile information to a currentUser variable
        // so it can be called easily for other functions
      	var currentUser = {
          userId: user.userId, //assigns the current user userID (database unique ID)
      		userName : user.userName, //assigns the current user's username
      		firstName : user.firstName, //assigns the current user's firstname
      		longitude : user.longitude, //assigns current user's address longitudinal coordinate
      		latitude: user.latitude, //assigns the current user's address latitudinal coordinate
      		email: user.email // assigns the current user's e-mail
      	}
        req.user = currentUser; 
        /// delete the password from the session
        req.session.user = currentUser;  //refresh the session value
        res.locals.user = currentUser;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});


// =============================================================
require("./routes/signupLoginRoutes.js")(app);
require("./routes/searchRoutes.js")(app);
require("./routes/addServiceRoutes.js")(app);
require("./routes/profileRoutes.js")(app);
require("./routes/messageRoutes.js")(app);
require("./routes/ratingRoutes.js")(app);

// starts the server with sequelize package. "force:false" doesn't truncate a table for every
//time server is started.
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

