// import the database.
var db = require("../models");

module.exports = {

  // function that shows the user to all the services they can add to their profile
  renderAddService : function(req, res){
  // console.log("logged in before render");

    //pull all the entries from the serviceOffered table
    db.serviceOffer.findAll({}).then(function(data){
      // assign the results of the query to a variable
      var serviceObject = {
              services: data,
              currentUser : req.session.user.firstName
        };

      // console.log("inside addService");
      //  console.log(req.session.user);
    
    // pass the variable to the add service page, and show add service page 
    res.render("addService", serviceObject);

        // console.log(serviceObject);
        // console.log("HHHH"+ serviceObject.services[0].dataValues.serviceName);
        // console.log("logged in before render");
        // res.render("addService", serviceObject);
        // console.log("logged in after render");

    // in case of an error, console log the error, and redirect the user to the error page.
    }).catch(function(error){
            console.log(error);
            res.redirect("/errorPage");
          //  res.json({error: "We are experiencing technical difficulty. Please try again..."});
  });
  },

  // this function allows the user to add a service to their profile
  addServiceDb : function(req, res){

  // assign the user inputs, from the page, to a variable
  var serviceId = req.body.serviceId;
  var description = req.body.description;
  var discount = req.body.discount;

  // console.log("inside addServiceDB");
  // console.log(req.session.user);

    // create database entry with the service associated with the current user
    db.userService.create({
    
      description: description,
      discount: discount,
      serviceOfferServiceId: serviceId,
      userProfileUserId: req.session.user.userId
      
      // once the entry is created, redirect the user to the "landing" page
    }).then(function(user){

      if(user){
        res.redirect("/landing");
      }
    // if there is an error, redirect the user to the error page
    }).catch(function(error){
            console.log(error);
            res.redirect("/errorPage");
          //  res.json({error: "We are experiencing technical difficulty. Please try again..."});
  });

  }

};


