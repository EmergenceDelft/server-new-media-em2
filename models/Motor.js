import { DataTypes } from "sequelize"

const Motor = (sequelize) => {
  const Motor = sequelize.define("motor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    voxel_id: {
      type: DataTypes.STRING,
      references: {
        model: "voxels",
        key: "id"
      }
    },
    angle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => 0,
      validate: {
        min: 0,
        max: 180
      }
    }
  })
  return Motor
}

export default Motor
