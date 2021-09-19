'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Room, { foreignKey: 'room_id' });
      // if one of this definition is deleted, there will be 
      // notif like: " .... is not associated to History!"
      History.belongsTo(models.User, { foreignKey: 'player_id'});
    }

    static getHistory = (id) => {
      return History.findAll({
        where: {
          player_id: id
        },
        attributes: [
          'id',
          'room_id',
          'result',
          'createdAt',
          'opponent'
        ],
      })
    }

    static getDashboard = (id) => {

    }// static

  };
  History.init({
    // column ini menentukan proses INSERT saat query database
    // pastikan column ini ada semua di DATABASE asli
    player_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    result: DataTypes.INTEGER,
    opponent: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};