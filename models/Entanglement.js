import { DataTypes, Sequelize } from "sequelize"
import { v4 as uuidv4 } from "uuid"

import Module from "./Module.js"

const Entanglement = (sequelize) => {
  const Entanglement = sequelize.define("entanglement", {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    moduleId: {
      type: DataTypes.STRING,
      references: {
        model: Module(sequelize, Sequelize),
        key: "id"
      }
    },
    relatedModuleId: {
      type: DataTypes.STRING,
      references: {
        model: Module(sequelize, Sequelize),
        key: "id"
      }
    }
  })
  return Entanglement
}

export default Entanglement
