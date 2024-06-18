import { DataTypes } from "sequelize"
import { MOTOR_OPTIONS, MOVEMENT_OPTIONS } from "../constants.js"

const Motor = (sequelize) => {
  const Motor = sequelize.define("motor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    angle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: () => 45
    },
    mac: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(MOTOR_OPTIONS),
      allowNull: false
    },
    movement: {
      type: DataTypes.ENUM(MOVEMENT_OPTIONS),
      allowNull: false
    }
  })
  return Motor
}

export default Motor
