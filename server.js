// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************


/*
 *  STEPS TO SEQUELIZE THE STAR WARS APP.
 *  1. Delete the orm from config. In your app folder, create a model folder
 *     with a character.js file in the model
 *  2. In character.js, model out the character table, as detailed
 *     in the schema.sql file located in the root of this project directory.
 *  3. Remove all references to the old orm file,
 *     and replace it with character.js
 *  4. Use Sequelize methods in place of the orm calls
 *     to retrieve and insert data.
 *  5. Update connection.js to use sequelize instead of the mysql package.
 *
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ */


// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var methodOverride = require("method-override");



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

// Routes
// =============================================================
require("./routes/signupLoginRoutes.js")(app);
require("./routes/searchRoutes.js")(app);
require("./routes/addServiceRoutes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

