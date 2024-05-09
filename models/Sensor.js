import { DataTypes } from "sequelize"

const Sensor = (sequelize) => {
  const Sensor = sequelize.define("sensor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  })
  return Sensor
}

export default Sensor
