import { DataTypes } from "sequelize"
import { MOTOR_OPTIONS } from "../constants.js"

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
      defaultValue: () => null,
      validate: {
        min: 0,
        max: 180
      }
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
      type: DataTypes.BOOLEAN
    }
  })
  return Motor
}

export default Motor
