'use strict';

//importamos los schemas y los nombres de las tablas de los modelos a usar.
const { USER_TABLE } = require('../models/user.model');
const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email:{
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password:{
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface) {
   await queryInterface.drop(USER_TABLE);
  }
};
