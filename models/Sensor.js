import { DataTypes } from "sequelize"

const Sensor = (sequelize) => {
  const Sensor = sequelize.define("sensor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    module_id: {
      type: DataTypes.STRING,
      references: {
        model: "modules",
        key: "mac_address"
      }
    },
    type: {
      type: DataTypes.ENUM(["ULTRASOUND", "LOUDNESS", "CAPACITIVE"]),
      allowNull: false
    }
  })
  return Sensor
}

export default Sensor
