var addServiceController = require("../controller/addService_controller");
var loggedInCheck = require("./loggedInCheck");


//export all routes into server.js

module.exports = function(app){



// 	app.get("/login", function(req, res) {

//     res.sendFile(path.join(__dirname + "/../public/login.html"));
// });	

app.get("/addService", loggedInCheck.requireLogin, addServiceController.renderAddService);

app.post("/addedService", loggedInCheck.requireLogin, addServiceController.addServiceDb);





}