'use strict';
const { DataTypes } = require('sequelize');
const{ CustomerSchema, CUSTOMER_TABLE} = require('../models/customer.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn(CUSTOMER_TABLE, 'phone', {
      type:DataTypes.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
