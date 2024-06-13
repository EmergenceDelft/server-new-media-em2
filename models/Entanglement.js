import { DataTypes } from "sequelize"

import Module from "./Module.js"

const Entanglement = (sequelize) => {
  const Entanglement = sequelize.define("entanglement", {
    moduleId: {
      type: DataTypes.STRING,
      references: {
        model: Module,
        key: "id"
      }
    },
    relatedModuleId: {
      type: DataTypes.STRING,
      references: {
        model: Module,
        key: "id"
      }
    }
  })
  return Entanglement
}

export default Entanglement
