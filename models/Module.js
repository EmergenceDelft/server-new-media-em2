import { DataTypes } from "sequelize";

const Module = (sequelize, Sequelize) => {
    const Module = sequelize.define("users", {
        id: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        mac_adres: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    });
    return Module;
}

//Definition of the one to many relationship between Module and Voxel
Module.associate = function(models) {
    Module.hasMany(models.Voxel, {
        foreignKey: "module_id"
    });
    Module.hasMany(models.Sensor, {
      foreignKey: "module_id"
  });
};


export default Module;

