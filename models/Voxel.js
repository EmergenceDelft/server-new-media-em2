const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Voxel extends Model {}

Voxel.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    module_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isOn: {
        type: DataTypes.BOOLEAN,
    },
    position_x: {
        type: DataTypes.INTEGER
    },
    position_y: {
        type: DataTypes.INTEGER
    }
  },
  {
    sequelize, 
    modelName: 'Voxel', 
  },
);

