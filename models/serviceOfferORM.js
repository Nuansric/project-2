module.exports = function(sequelize, DataTypes){
var serviceOffer = sequelize.define("serviceOffer", {


serviceId:{
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
},
serviceName: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false

},
{
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          serviceOffer.hasMany(models.userService, {
            onDelete: "cascade"
          });
        }
      }
    }



);

return serviceOffer;

}



