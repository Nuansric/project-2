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
    , allowNull: false,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [5, 15]
      }

  },
password: {
    type: DataTypes.STRING
     , allowNull: false
      // len is a validation that checks that our todo is between 1 and 140 characters
      //, validate: {
      //   len: [5, 8]
      // }
  },
firstName: {
    type: DataTypes.STRING
     , allowNull: false,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [1, 20]
      }
  },
address_1: {
    type: DataTypes.STRING
     , allowNull: false,
  },
address_2: {
    type: DataTypes.STRING
  },
city: {
    type: DataTypes.STRING
     , allowNull: false,
  },
state: {
    type: DataTypes.STRING
     , allowNull: false
  },
zipCode: {
    type: DataTypes.STRING
     , allowNull: false,
     validate: {
        len: [5, 5]
      }
  },
country: {
    type: DataTypes.STRING
     , allowNull: false
  },
phone: {
    type: DataTypes.STRING
    , unique: true
    , allowNull: false,
    validate: {
        len: [10, 10]
      }
  },
email: {
    type: DataTypes.STRING
     , unique: true
    , allowNull: false,
    validate: {
        len: [1, 50]
      }

  },
longitude: {
    type: DataTypes.DECIMAL(11, 8)
    
  },
latitude: {
    type: DataTypes.DECIMAL(11, 8)
    
    
  }
}, 
{
      // We're saying that we want our Author to have Posts
  classMethods: {

    associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
    userProfile.hasMany(models.userService, {
    onDelete: "cascade"
    });
        }
      },
    
timestamps: false


    }


// {
  

// }

);

return userProfile;

}









