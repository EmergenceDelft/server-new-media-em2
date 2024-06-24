import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from "uuid"

const Voxel = (sequelize) => {
  const Voxel = sequelize.define("voxel", {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => {
        console.log(uuidv4())
        return uuidv4()
      },
      primaryKey: true,
      allowNull: false
    }
  })
  return Voxel
}

export default Voxel
