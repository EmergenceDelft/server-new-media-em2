import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"

const SensorReading = (sequelize) => {
  const SensorReading = sequelize.define("sensor_reading", {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  return SensorReading
}

export default SensorReading
