import { DataTypes } from "sequelize"

const Module = (sequelize) => {
  const Module = sequelize.define("module", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    position_x: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    position_y: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  })
  return Module
}

export default Module
