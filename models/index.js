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

//many modules are entangled to many modules

db.Module.belongsToMany(db.Module, {
  as: "originalModule",
  foreignKey: "moduleId",
  otherKey: "entangledModuleId",
  through: "entangled"
})
db.Module.belongsToMany(db.Module, {
  as: "entangledModule",
  foreignKey: "entangledModuleId",
  otherKey: "moduleId",
  through: "entangled"
})

//db.Module.belongsToMany(db.Module)

//One Module has many Voxels
db.Module.hasMany(db.Voxel, {
  // foreignKey: "module_id"
})
db.Voxel.belongsTo(db.Module, {
  // foreignKey: "module_id"
})

//One Module has many Sensors
db.Module.hasMany(db.Sensor, {
  // foreignKey: "module_id"
})
db.Sensor.belongsTo(db.Module, {
  // foreignKey: "module_id"
})

//one Module has many motors
db.Voxel.hasMany(db.Motor, {
  // foreignKey: "voxel_id"
})
db.Motor.belongsTo(db.Voxel, {
  // foreignKey: "voxel_id"
})
//One Sensor has many SensorReadings
db.Sensor.hasMany(db.SensorReading, {
  // foreignKey: "id"
})
db.SensorReading.belongsTo(db.Sensor, {
  // foreignKey: "id"
})

export default db
