import { DataTypes } from "sequelize"

const Module = (sequelize) => {
  const Module = sequelize.define("module", {
    mac_address: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    connection_alive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })
  return Module
}

export default Module
