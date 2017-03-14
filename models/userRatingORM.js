module.exports = function(sequelize, DataTypes){
  var userRating = sequelize.define("userRating", {

    ratingId:{
    type: DataTypes.INTEGER
    ,autoIncrement: true
    ,primaryKey: true
    , allowNull: false

    },
    isLiked: {
        type: DataTypes.BOOLEAN
        , allowNull: false
      
      },
    customerId: {
      type: DataTypes.INTEGER
        , allowNull: false
    }

  }, 
  {
      // We're saying that we want our Author to have Posts
    classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          userRating.belongsTo(models.userService, {
            foreignKey: {
              allowNull: false
            }
          });
        }
    }
  });

  return userRating;

}

