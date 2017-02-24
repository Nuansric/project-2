//AJAX Call to google map API

// installing request npm package to receive data from URL
var request = require("request");

var APIKeys = require("keys.js");

// API key for google.
var googleCred = APIKeys.keys.googleApi;
// URL where the request for geocoding is made
var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

// pass the address and call back function to geocode
// call back function waits for the results from request URL
// and stores the value in a variable as an object
var geocode = function(address, cb) {

    // concatenate different parts of URL to make a query
    var url = geoCodeURL + address + "&key=" + apiKey;

    //call the request function. Call back function extracts the relevant data
    // in this case, longitude and latitude associate with hte address
    request(url, function(error, response, body){

        // convert the body to JSON. Body is a string originally
        var result = JSON.parse(body);

        // store the values in a variable
        var coordinates = {
            latitude: result.results[0].geometry.location.lat,
            longitude: result.results[0].geometry.location.lng
        }

        // cb function helps storing the value outside the callback function
        // for the request query.
        cb(coordinates);

    });   
};

// call the geocode function, along with the callback function
var latLng = geocode(address, function(res){

    var coordinates = res;
    return coordinates;

});

module.exports = geocode;