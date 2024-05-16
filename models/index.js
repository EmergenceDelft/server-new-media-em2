import Sequelize from "sequelize"
import sequelize from "../services/db.js"

// Define a db object that can be used globally
const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

// Define all models in the db object
import Module from "./Module.js"
import Voxel from "./Voxel.js"
import Sensor from "./Sensor.js"
import SensorReading from "./SensorReading.js"
import Motor from "./Motor.js"

db.Module = Module(sequelize, Sequelize)
db.Voxel = Voxel(sequelize, Sequelize)
db.Sensor = Sensor(sequelize, Sequelize)
db.SensorReading = SensorReading(sequelize, Sequelize)
db.Motor = Motor(sequelize, Sequelize)

//One Module has many Voxels
db.Module.hasMany(db.Voxel, {
  foreignKey: "module_id"
})
db.Voxel.belongsTo(db.Module, {
  foreignKey: "module_id"
})

//One Module has many Sensors
db.Module.hasMany(db.Sensor, {
  foreignKey: "module_id"
})
db.Sensor.belongsTo(db.Module, {
  foreignKey: "module_id"
})

//one Module has many motors
db.Module.hasMany(db.Motor, {
  foreignKey: "module_mac_address"
})
db.Motor.belongsTo(db.Module, {
  foreignKey: "module_mac_address"
})
//One Sensor has many SensorReadings
db.Sensor.hasMany(db.SensorReading, {
  foreignKey: "sensor_id"
})
db.SensorReading.belongsTo(db.Sensor, {
  foreignKey: "sensor_id"
})

export default db
