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
    level: {
      type: DataTypes.INTEGER
    },
    side: {
      type: DataTypes.INTEGER
    }
  })
}

export default Voxel
