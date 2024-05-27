import { DataTypes } from "sequelize"

const Module = (sequelize) => {
  const Module = sequelize.define("module", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    connection_alive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    orientation: {
      type: DataTypes.INTEGER,
      default: 0
    }
  })
  return Module
}

export default Module
