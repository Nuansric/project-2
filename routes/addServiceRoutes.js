var addServiceController = require("../controller/addService_controller");

//export all routes into server.js

module.exports = function(app){



// 	app.get("/login", function(req, res) {

//     res.sendFile(path.join(__dirname + "/../public/login.html"));
// });	

app.get("/addService", addServiceController.renderAddService);

app.post("/addedService", addServiceController.addServiceDb);





}