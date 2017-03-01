// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies

// =============================================================
// var config = {
//   apiKey: "AIzaSyDuq0aKWmRuaH8d9SqdOkjteVP0uNmuxf8",
//   authDomain: "neighbornetwork-5a6c7.firebaseapp.com",
//   databaseURL: "https://neighbornetwork-5a6c7.firebaseio.com",
//   storageBucket: "neighbornetwork-5a6c7.appspot.com",
//   messagingSenderId: "748426580419"
// };
// var admin = require("firebase-admin");
// var serviceAccount = require("./neighbornetwork-5a6c7-firebase-adminsdk-gb6ax-cdb6f8c596.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://neighbornetwork.firebaseio.com"
// });

var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var methodOverride = require("method-override");
// var cookieSession = require('cookie-session');
var session = require('client-sessions');


// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
 app.use(express.static("public"));
app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Sets up the Express App
app.set('trust proxy', "1") ;
// Routes
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 60 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
     db.userProfile.findOne({
        where:{userName: req.body.userName}
    }).then(function(user) {
      if (user) {
      	var currentUser = {
          userId: user.userId,
      		userName : user.userName,
      		firstName : user.firstName,
      		longitude : user.longitude,
      		latitude: user.latitude,
      		email: user.email
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




db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

