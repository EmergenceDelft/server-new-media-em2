import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"

const Module = (sequelize) => {
  const Module = sequelize.define("module", {
    id: {
      type: DataTypes.STRING,
      //we need () =>, otherwise the uuidv4 is only computed once and used as a default
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    mac_address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return Module
}

export default Module
