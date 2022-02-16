const { Model, DataTypes , Sequelize} = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customer'

const CustomerSchema = {

  id :{
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull:false,
    type: DataTypes.STRING,
  },
  lastName:{
    allowNull:false,
    type: DataTypes.STRING
  },
  phone:{
    allowNull:false,
    type:DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  userId:{
    field:'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }

};

class Customer extends Model {

  static associate(models){
    this.belongsTo(models.User, {as:'user'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey:'customerId'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName:'Customer',
      timestamps: false,
    }
  }

}

module.exports = { CUSTOMER_TABLE ,Customer, CustomerSchema};
