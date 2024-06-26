import { DataTypes } from "sequelize"

const Voxel = (sequelize) => {
  const Voxel = sequelize.define("voxel", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    isOn: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    level: {
      type: DataTypes.INTEGER
    },
    side: {
      type: DataTypes.INTEGER
    }
  })
  return Voxel
}

export default Voxel
