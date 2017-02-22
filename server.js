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

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Serve static content for the app from the "public" directory in the application directory.

app.use(express.static(process.cwd() + "/public"));

// Routes
// =============================================================
var routes = require("./controller/controller.js");

app.use("/" , routes);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

