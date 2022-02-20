'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { USER_TABLE } = require('../models/user.model');
const { CATEGORY_TABLE } = require('../models/category.model');
const { PRODUCT_TABLE } = require('../models/product.model');
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');
const { ORDER_TABLE } = require('../models/order.model');

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
      },
      role:{
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
      }
    });

    await queryInterface.createTable(CUSTOMER_TABLE , {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name:{
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName:{
        allowNull: false,
        type: DataTypes.STRING
      },
      phone:{
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      userId:{
        field:'user_id',
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });


    await queryInterface.createTable(ORDER_TABLE, {
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

    await queryInterface.createTable( CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      image:{
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt:{
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
        type: DataTypes.DATE
      }
    } );

    await queryInterface.createTable( PRODUCT_TABLE, {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:DataTypes.INTEGER
      },
      name:{
        allowNull: false,
        type:DataTypes.STRING,
      },
      price:{
        allowNull: false,
        type:DataTypes.INTEGER,
      },
      description:{
        allowNull: false,
        type:DataTypes.TEXT
      },
      image:{
        allowNull: false,
        type:DataTypes.STRING
      },
      createdAt:{
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
        type: DataTypes.DATE
      },
      categoryId:{
        allowNull: false,
        field: 'category_id',
        type: DataTypes.INTEGER,
        references:{
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    } );



    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field:'created_at',
        defaultValue: Sequelize.NOW
      },
      amount:{
        allowNull: false,
        type:DataTypes.INTEGER
      },
      orderId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'order_id',
        references:{
          model: ORDER_TABLE,
          key: 'id'
        },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
      },
      productId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_id',
        references:{
          model: PRODUCT_TABLE,
          key: 'id'
        },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
      }
    });

  },

  async down (queryInterface) {

    await queryInterface.dropTable( ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);


   }

};
