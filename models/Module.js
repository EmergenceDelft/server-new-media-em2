import { DataTypes } from "sequelize"

const Module = (sequelize) => {
  const Module = sequelize.define("module", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    minProximityThreshold: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },
    maxProximityThreshold: {
      type: DataTypes.FLOAT,
      defaultValue: 120
    },
    minAudioJitterThreshold: {
      type: DataTypes.FLOAT,
      defaultValue: 500
    },
    maxAudioJitterThreshold: {
      type: DataTypes.FLOAT,
      defaultValue: 5000
    },
    audioSampleAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    audioSampleInterval: {
      type: DataTypes.FLOAT,
      defaultValue: 100
    },
    position_x: {
      type: DataTypes.FLOAT,
      defaultValue: 0.5
    },
    position_y: {
      type: DataTypes.FLOAT,
      defaultValue: 0.5
    }
  })
  return Module
}

export default Module
