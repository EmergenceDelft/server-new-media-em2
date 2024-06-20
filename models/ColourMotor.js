import { DataTypes } from "sequelize"
import { MOTOR_OPTIONS, MOVEMENT_OPTIONS } from "../constants.js"

const ColourMotor = (sequelize) => {
  const ColourMotor = sequelize.define("colour_motor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    minAngle: {
      type: DataTypes.INTEGER,
      defaultValue: () => 0,
      validate: {
        min: 0,
        max: 180
      }
    },
    maxAngle: {
      type: DataTypes.INTEGER,
      defaultValue: () => 180,
      validate: {
        min: 0,
        max: 180
      }
    },
    rotationIncrement: {
      type: DataTypes.INTEGER,
      defaultValue: () => 1,
    },
    minJitterIncrement: {
      type: DataTypes.INTEGER,
      defaultValue: () => -2,
    },
    maxJitterIncrement: {
      type: DataTypes.INTEGER,
      defaultValue: () => 5,
    }
  })
  return ColourMotor
}

export default ColourMotor
