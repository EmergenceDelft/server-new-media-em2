const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Module extends Model {}

Module.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mac_adres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Module', 
  },
);
