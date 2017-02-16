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

});

return serviceOffer;

}



