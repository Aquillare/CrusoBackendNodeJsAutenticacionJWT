'use strict';
const { ORDER_TABLE } = require('../models/order.model');
const { DataTypes, Sequelize} = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE,{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerId:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references:{
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'

      },
      createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
