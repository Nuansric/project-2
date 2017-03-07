// initilize the required npm packages
var request = require("request");
var env       = process.env.NODE_ENV || 'development';

// development mode in node pulls the API key from keys.js file
if (env === "development"){
    var APIKeys = require("./keys.js");
}


// API key for google.
var googleCred = process.env.googleApi || APIKeys.keys.googleApi;
// URL where the request for geocoding is made
var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

// pass the address and call back function to geocode
// call back function waits for the results from request URL
// and stores the value in a variable as an object

var geocode = function(address, cb) {

    // pulls the API key from specified location and assigns it to a variable
    var apiKey = googleCred;

    // concatenate different parts of URL to make a query
    var url = geoCodeURL + address + "&key=" + apiKey;

    //call the request function. Call back function extracts the relevant data
    // in this case, longitude and latitude associate with hte address
    request(url, function(error, response, body){

        // convert the body to JSON. Body is a string originally
        var result = JSON.parse(body);

        if(result.results == undefined || result.results.length == 0 ){
        // store the values in a variable
        var coordinates = "Not Found";
        // cb function helps storing the value outside the callback function
        // for the request query.
        cb(coordinates);
    }else{

        var coordinates = {
            latitude: result.results[0].geometry.location.lat,
            longitude: result.results[0].geometry.location.lng
        }

        cb(coordinates);
    }

    });   
};

module.exports = geocode;