module.exports = function(sequelize, DataTypes){
var messages = sequelize.define("messages", {


receiverId:{
  type: DataTypes.INTEGER
},
senderId: {
    type: DataTypes.INTEGER
  },

 message: {
    type: DataTypes.TEXT
  }
});

return messages;

}

