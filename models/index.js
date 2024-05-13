import Sequelize from "sequelize";
import sequelize from "../services/db.js";

// Define a db object that can be used globally
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Define all models in the db object
import Module from "./Module.js";
import Voxel from "./Voxel.js";
import Sensor from "./Sensor.js";
import SensorReading from "./Sensor.js";

db.Module = Module(sequelize, Sequelize);
db.Voxel = Voxel(sequelize, Sequelize);
db.Sensor = Sensor(sequelize, Sequelize);
db.SensorReading = SensorReading(sequelize, Sequelize);


//One Module has many Voxels
db.Module.hasMany(db.Voxel);
db.Voxel.belongsTo(db.Module, {
  foreignKey: "module_id",
});

//One Module has many Sensors
db.Module.hasMany(db.Sensor);
db.Sensor.belongsTo(db.Sensor, {
  foreignKey: "module_id",
});

//One Sensor has many SensorReadings
db.Sensor.hasMany(db.SensorReading);
db.SensorReading.belongsTo(db.Sensor, {
  foreignKey: "sensor_id",
});

export default db;
