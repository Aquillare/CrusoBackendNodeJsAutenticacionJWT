'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    //
  },

  async down (queryInterface) {
    await queryInterface.dropTable( PRODUCT_TABLE )
  }
};
