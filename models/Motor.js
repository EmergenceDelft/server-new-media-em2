import { DataTypes } from "sequelize"

const Motor = (sequelize) => {
  const Motor = sequelize.define("motor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    module_mac_address: {
      type: DataTypes.STRING,
      references: {
        model: "modules",
        key: "mac_address"
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
