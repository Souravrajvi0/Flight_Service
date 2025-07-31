'use strict';
const {ENUMS} = require('../utils/common')
const {
  Model
} = require('sequelize');
const { SEAT_TYPE } = require('../utils/common/enums');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey : 'airplaneId'
      })
    }
  }
  Seat.init({
    row: {
      type :DataTypes.INTEGER,
      allowNull : false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull : false
    },
    airplaneId: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    type: {
      type : DataTypes.ENUM,
      values : [ENUMS.SEAT_TYPE.BUSINESS,ENUMS.SEAT_TYPE.ECONOMY,ENUMS.SEAT_TYPE.PREMIUM_ECONOMY,ENUMS.SEAT_TYPE.FIRST_CLASS],
      defaultValue : ENUMS.SEAT_TYPE.ECONOMY,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};