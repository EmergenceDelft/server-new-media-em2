import { DataTypes } from "sequelize"
import { SENSOR_OPTIONS } from "../constants.js"

const Sensor = (sequelize) => {
  const Sensor = sequelize.define("sensor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(SENSOR_OPTIONS),
      allowNull: false
    }
  })
  return Sensor
}

export default Sensor
