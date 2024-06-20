import { DataTypes } from "sequelize"
import { MOTOR_OPTIONS, MOVEMENT_OPTIONS } from "../constants.js"

const TransparencyMotor = (sequelize) => {
  const TransparencyMotor = sequelize.define("transparency_motor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    activeAngle: {
      type: DataTypes.INTEGER,
      defaultValue: () => 0,
      validate: {
        min: 0,
        max: 180
      }
    },
    inactiveAngle: {
      type: DataTypes.INTEGER,
      defaultValue: () => 90,
      validate: {
        min: 0,
        max: 180
      }
    }
  })
  return TransparencyMotor
}

export default TransparencyMotor
