'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint('Airports',{
    fields : ['cityid'],
    type : 'FOREIGN KEY',
    name : 'city_foreign_key_constraint',
    references : {
      table : 'cities',
      field : 'id'
    },
    onUpdate : 'CASCADE',
    onDelete : 'CASCADE'
   });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Airports','city_foreign_key_constraint');
  }
};
