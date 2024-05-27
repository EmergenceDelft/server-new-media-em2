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
    // sensor_id: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: "sensors",
    //     key: "id"
    //   }
    // },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    processed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  return SensorReading
}

export default SensorReading
