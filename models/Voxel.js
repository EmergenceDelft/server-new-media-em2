import { DataTypes } from "sequelize"

const Voxel = (sequelize) => {
  return sequelize.define("voxel", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    module_id: {
      type: DataTypes.STRING,
      references: {
        model: "modules",
        key: "mac_address"
      }
    },
    isOn: {
      type: DataTypes.BOOLEAN
    },
    position_x: {
      type: DataTypes.INTEGER
    },
    position_y: {
      type: DataTypes.INTEGER
    }
  })
}

export default Voxel
