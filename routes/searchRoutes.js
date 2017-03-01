var searchController = require("../controller/search_controller");
var loggedInCheck = require("./loggedInCheck");


//export all routes into server.js
module.exports = function(app){



// 	app.get("/login", function(req, res) {

//     res.sendFile(path.join(__dirname + "/../public/login.html"));
// });	

app.get("/search", loggedInCheck.requireLogin, searchController.renderSearchBar);

app.post("/service", loggedInCheck.requireLogin, searchController.findService);

app.get("/service1", loggedInCheck.requireLogin, searchController.findService);






}