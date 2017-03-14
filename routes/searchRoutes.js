var searchController = require("../controller/search_controller");
var loggedInCheck = require("./loggedInCheck");


//export all routes into server.js
module.exports = function(app){

// 	app.get("/login", function(req, res) {

//     res.sendFile(path.join(__dirname + "/../public/login.html"));
// });	


    // take the user to the search page
    app.get("/search", loggedInCheck.requireLogin, searchController.renderSearchBar);
    // let the user pick the service and search the database
    app.post("/service", loggedInCheck.requireLogin, searchController.findService);
    // show the user the results
    app.get("/service1", loggedInCheck.requireLogin, searchController.findService);

}