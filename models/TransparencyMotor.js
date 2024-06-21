import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"

const TransparencyMotor = (sequelize) => {
  const TransparencyMotor = sequelize.define("transparencyMotor", {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
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
