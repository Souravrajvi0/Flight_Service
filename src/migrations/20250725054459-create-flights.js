'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull : false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Airplanes',
          key : 'id'
        },
        onDelete : 'CASCADE'
      },
      departureAirportId: {
        type: Sequelize.STRING,
        allowNull : false,
        references : {
          model : 'Airports',
          key : 'code'
        },
        onDelete : 'CASCADE'
      },
      arrivalAirportId: {
        type: Sequelize.STRING,
        allowNull : false,
         references : {
          model : 'Airports',
          key : 'code'
        },
        onDelete : 'CASCADE'
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull : false
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull : false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flights');
  }
};