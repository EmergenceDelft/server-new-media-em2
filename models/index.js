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
import Motor from "./ColourMotor.js"
import Entanglement from "./Entanglement.js"

db.Module = Module(sequelize, Sequelize)
db.Voxel = Voxel(sequelize, Sequelize)
db.Sensor = Sensor(sequelize, Sequelize)
db.SensorReading = SensorReading(sequelize, Sequelize)
db.Motor = Motor(sequelize, Sequelize)
db.Entanglement = Entanglement(sequelize, Sequelize)

//many modules are entangled to many modules
db.Module.belongsToMany(db.Module, {
  as: "originalModule",
  foreignKey: "moduleId",
  otherKey: "entangledModuleId",
  through: db.Entanglement
})

db.Module.belongsToMany(db.Module, {
  as: "entangledModule",
  foreignKey: "entangledModuleId",
  otherKey: "moduleId",
  through: db.Entanglement
})

//One Module has many Voxels
db.Module.hasMany(db.Voxel)
db.Voxel.belongsTo(db.Module)

//One Module has many Sensors
db.Module.hasMany(db.Sensor)
db.Sensor.belongsTo(db.Module)

//one Module has many motors
db.Voxel.hasMany(db.Motor)
db.Motor.belongsTo(db.Voxel)

//One Sensor has many SensorReadings
db.Sensor.hasMany(db.SensorReading)
db.SensorReading.belongsTo(db.Sensor)

export default db
