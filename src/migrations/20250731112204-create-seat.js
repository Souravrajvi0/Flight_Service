'use strict';

const {ENUMS}  = require('../utils/common')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull : false

      
      },
      col: {
        type: Sequelize.STRING,
        allowNull : false

      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Airplanes',
          key : 'id'
        }

      },
      type: {
        type: Sequelize.ENUM,
        allowNull : false,
        values : [ENUMS.SEAT_TYPE.BUSINESS,ENUMS.SEAT_TYPE.ECONOMY,ENUMS.SEAT_TYPE.PREMIUM_ECONOMY,ENUMS.SEAT_TYPE.FIRST_CLASS],
        defaultValue : ENUMS.SEAT_TYPE.ECONOMY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};