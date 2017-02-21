module.exports = function(sequelize, DataTypes){
var userService = sequelize.define("userService", {


userId:{
  type: DataTypes.INTEGER
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

},
{
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          userService.belongsTo(models.serviceOffer, {
            foreignKey: {
              allowNull: false
            }
          });
        },
     
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          userService.belongsTo(models.userProfile, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }




);

return userService;

}



