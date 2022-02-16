'use strict';

//importamos los schemas y los nombres de las tablas de los modelos a usar.
const { UserSchema, USER_TABLE } = require('../models/user.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema)
  },

  async down (queryInterface) {
   await queryInterface.drop(USER_TABLE);
  }
};
