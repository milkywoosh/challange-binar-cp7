'use strict';
const {
  Model
} = require('sequelize');


/*
    BUAT APAAA???
*/


module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static generate = (name) => {
      return Room.create({ name });
    }
  };
  
  Room.init({
     // column ini menentukan proses INSERT saat query database
    // pastikan column ini ada semua di DATABASE asli
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};