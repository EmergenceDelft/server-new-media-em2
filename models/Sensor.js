import { DataTypes } from "sequelize"

const Sensor = (sequelize, Sequelize) => {
  const Sensor = sequelize.define("users", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  })
  return Sensor
}

export default Sensor
