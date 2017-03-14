var addServiceController = require("../controller/addService_controller");
var loggedInCheck = require("./loggedInCheck");


//export all routes into server.js

module.exports = function(app){



// 	app.get("/login", function(req, res) {

//     res.sendFile(path.join(__dirname + "/../public/login.html"));
// });	

// get route to show user the page to add a service. Check whether user is
// logged in with loggedInCheck.
app.get("/addService", loggedInCheck.requireLogin, addServiceController.renderAddService);

// post route to push users service to the database.
app.post("/addedService", loggedInCheck.requireLogin, addServiceController.addServiceDb);





}