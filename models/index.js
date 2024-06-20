import Sequelize from "sequelize"
import sequelize from "../services/db.js"

/* Define a db object that can be used globally */
const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

/* Define all models in the db object */
import Module from "./Module.js"
import Voxel from "./Voxel.js"
import ColourMotor from "./ColourMotor.js"
import TransparencyMotor from "./TransparencyMotor.js"
import Entanglement from "./Entanglement.js"

db.Module = Module(sequelize, Sequelize)
db.Voxel = Voxel(sequelize, Sequelize)
db.ColourMotor = ColourMotor(sequelize, Sequelize)
db.TransparencyMotor = TransparencyMotor(sequelize, Sequelize)
db.Entanglement = Entanglement(sequelize, Sequelize)

/* Many modules are Entangled with many modules */
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

/* One Module has many Voxels */
db.Module.hasMany(db.Voxel)
db.Voxel.belongsTo(db.Module)

/* One Voxel has one ColourMotors and one TransparencyMotors */
db.Voxel.hasOne(db.ColourMotor)
db.Voxel.hasOne(db.TransparencyMotor)

export default db
