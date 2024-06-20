import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"


const Module = (sequelize) => {
  const Module = sequelize.define("module", {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    mac_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position_x: {
      type: DataTypes.FLOAT,
      default: 0
    },
    position_y: {
      type: DataTypes.FLOAT,
      default: 0
    }
  })
  return Module
}

export default Module
