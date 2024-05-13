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
    type: {
      type: DataTypes.ENUM(["ULTRASOUND", "LOUDNESS", "CAPACITIVE"]),
      allowNull: false
    }
  })
  return Sensor
}

export default Sensor
