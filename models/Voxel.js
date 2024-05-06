import { DataTypes } from "sequelize";

const Voxel = (sequelize, Sequelize) => {
    return sequelize.define("voxel", {
      id: {
        type: DataTypes.UUIDV4,
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
    });
}

//Definition of the one to many relationship between Module and Sensor
Voxel.associate = function(models) {
    Voxel.belongsTo(models.Module, {
        foreignKey: "module_id"
    });
};

export default Voxel;
