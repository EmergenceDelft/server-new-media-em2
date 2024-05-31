import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"
import { SENSOR_OPTIONS } from "../constants.js"

const SensorReading = (sequelize) => {
  const SensorReading = sequelize.define("sensor_reading", {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    processed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    type: {
      type: DataTypes.ENUM(SENSOR_OPTIONS),
      allowNull: false
    }
  })
  return SensorReading
}

export default SensorReading
