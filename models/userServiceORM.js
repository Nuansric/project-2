module.exports = function(sequelize, DataTypes){
var userService = sequelize.define("userService", {


userId:{
  type: DataTypes.INTEGER,
  , allowNull: false

},
serviceID: {
    type: DataTypes.STRING
    , allowNull: false
  },
description: {
    type: DataTypes.STRING
    , allowNull: false,
     validate: {
        len: [1, 200]
      }
  },
discount: {
    type: DataTypes.BOOLEAN
      , allowNull: false
  }
}, {
  timestamps: false

});

return userService;

}



