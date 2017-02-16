// EACH DATABASE TABLE MUST HAVE THIS FILE 



/* EXAMPLE CODE ++++++++++++++++++++++++++++
// Creates a "Chirp" model that matches up with DB
var Chirp = DataTypesConnection.define("chirp", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: DataTypes.STRING
  },
  body: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE
  }
}, {
  timestamps: false
});

// Syncs with DB
Chirp.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = Chirp;




*/

module.exports = function(sequelize, DataTypes){
var userProfile = sequelize.define("userProfile", {


userId:{
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
},
userName: {
    type: DataTypes.STRING
    , unique: true

  },
password: {
    type: DataTypes.STRING
  },
address_1: {
    type: DataTypes.STRING
  },
address_2: {
    type: DataTypes.STRING
  },
city: {
    type: DataTypes.STRING
  },
state: {
    type: DataTypes.STRING
  },
zipCode: {
    type: DataTypes.STRING
  },
phone: {
    type: DataTypes.STRING
     , unique: true
  },
email: {
    type: DataTypes.STRING
     , unique: true
  },
longitude: {
    type: DataTypes.DECIMAL
  },
latitude: {
    type: DataTypes.DECIMAL
  }
}, {
  timestamps: false

});

return userProfile;

}









