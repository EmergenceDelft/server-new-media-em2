import { DataTypes } from "sequelize"

const Sensor = (sequelize) => {
  const Sensor = sequelize.define("sensor", {
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
