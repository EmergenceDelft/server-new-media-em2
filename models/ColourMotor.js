import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"

const ColourMotor = (sequelize) => {
  const ColourMotor = sequelize.define("colourMotor", {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
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
      defaultValue: () => 1
    },
    minJitterIncrement: {
      type: DataTypes.INTEGER,
      defaultValue: () => -2
    },
    maxJitterIncrement: {
      type: DataTypes.INTEGER,
      defaultValue: () => 5
    }
  })
  return ColourMotor
}

export default ColourMotor