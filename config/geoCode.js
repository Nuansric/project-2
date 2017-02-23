//AJAX Call to google map API

var request = require("request");

var apiKey = "AIzaSyCDuVHudRelXYb1Sba9VCXt51P-zPFowQE";

var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

var geocode = function(address) {

    var url = geocodeURL + address + "&key=" + apiKey;

    console.log(url);

    request(url, function(error, response, body){

        console.log(response);
        var coordinates = {
            latitude: response.results.geometry.location.lat,
            longitude: response.results.geometry.location.lon
        }
    return coordinates;
    });
};

module.exports = geocode;