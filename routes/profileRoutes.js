var profileController = require("../controller/profile_controller");
var loggedInCheck = require("./loggedInCheck");


//export all routes into server.js

module.exports = function(app) {

app.get("/viewProfile", loggedInCheck.requireLogin, profileController.renderProfilePage);

app.delete("/delete", loggedInCheck.requireLogin, profileController.deleteAccount);

app.get("/signout", profileController.signout);



}
