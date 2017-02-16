module.exports = function(sequelize, DataTypes){
var userService = sequelize.define("userService", {


userId:{
  type: DataTypes.INTEGER,
},
serviceID: {
    type: DataTypes.STRING
  },
description: {
    type: DataTypes.STRING
  },
discount: {
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: false

});

return userService;

}



