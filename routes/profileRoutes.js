var profileController = require("../controller/profile_controller");
var loggedInCheck = require("./loggedInCheck");


//export all routes into server.js

module.exports = function(app) {

    // view profile information
    app.get("/viewProfile", loggedInCheck.requireLogin, profileController.renderProfilePage);
    // delete the user from the database
    app.delete("/delete", loggedInCheck.requireLogin, profileController.deleteAccount);
    // log out.
    app.get("/signout", profileController.signout);
}
