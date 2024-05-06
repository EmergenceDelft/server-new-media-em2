const sequelize = require('services/db')

class Module extends Model {}

// Definition of the Module database model
Module.init(
  {
    id: {
      type: DataTypes.UUIDV4,
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

//Definition of the one to many relationship between Module and Voxel
Module.associate = function(models) {
    Module.hasMany(models.Voxel, {
        foreignKey: "module_id"
    });
};

//Definition of the one to many relationship between Module and Sensor
Module.associate = function(models) {
    Module.hasMany(models.Sensor, {
        foreignKey: "module_id"
    });
};
