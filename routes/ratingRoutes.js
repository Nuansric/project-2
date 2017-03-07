var ratingController = require("../controller/ratingController");
var loggedInCheck = require("./loggedInCheck");


//export all routes into server.js
module.exports = function(app){

app.post("/like", loggedInCheck.requireLogin, ratingController.likeRating);

app.post("/dislike", loggedInCheck.requireLogin, ratingController.dislikeRating);

app.post("/dislikePolicy", loggedInCheck.requireLogin, ratingController.dislikePolicy);




}