var searchController = require("../controller/search_controller");

//export all routes into server.js
module.exports = function(app){



// 	app.get("/login", function(req, res) {

//     res.sendFile(path.join(__dirname + "/../public/login.html"));
// });	

app.get("/search", searchController.renderSearchBar);

app.post("/service", searchController.findService);





}