import { DataTypes } from "sequelize";

const Voxel = (sequelize, Sequelize) => {
    return sequelize.define("voxel", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
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

export default Voxel;
