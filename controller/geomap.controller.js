//Calculate the distance of the user address to the other users for GeoCode API


/*var R = 6371; // km
var dLat = (lat2-lat1).toRad();
var dLon = (lon2-lon1).toRad();
var lat1 = lat1.toRad();
var lat2 = lat2.toRad();

var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c;
shareimprove this answer
edited Feb 5 '15 at 21:45

AdrieanKhisbe
2,04152038
answered Dec 13 '08 at 22:22

cletus
422k121781881
13	 	
In case it's not obvious, the toRad() method is a customization to the Number prototype such as: Number.prototype.toRad = function() { return this * (Math.PI / 180); }; . Or, as indicated below, you can replace (Math.PI/2) with 0.0174532925199433 

*/
