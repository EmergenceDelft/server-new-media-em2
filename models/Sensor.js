import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"

const Sensor = (sequelize) => {
  const Sensor = sequelize.define("sensor", {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    from_mac: {
      type: DataTypes.STRING
    },
    sensor_type: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.REAL
    }
  })
  return Sensor
}

export default Sensor
