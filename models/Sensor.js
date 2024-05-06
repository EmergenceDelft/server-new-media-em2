const sequelize = require('services/db')

class Sensor extends Model {}

Sensor.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Sensor', 
  },
);

