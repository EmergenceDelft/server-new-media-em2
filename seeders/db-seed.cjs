// seeders/demo-seed.js
"use strict"

const { v4: uuidv4 } = require("uuid")

function generateRandomMac() {
  return Array(6)
    .fill()
    .map(() =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0")
    )
    .join(":")
}

module.exports = {
  up: async (queryInterface) => {
    // Seed data for Module
    const modules = [
      {
        id: generateRandomMac(),
        orientation: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateRandomMac(),
        orientation: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateRandomMac(),
        orientation: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("modules", modules)

    // Seed data for Voxel
    const voxels = [
      {
        id: `${modules[0].id}::VOXEL`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${modules[1].id}::VOXEL`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${modules[2].id}::VOXEL`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("voxels", voxels)

    // Seed data for Motor
    const motors = [
      {
        id: `${voxels[0].id}::COLOR`,
        mac: generateRandomMac(), // Add random MAC address
        type: "COLOR",
        movement: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${voxels[0].id}::TRANSPARENCY`,
        mac: generateRandomMac(), // Add random MAC address
        type: "TRANSPARENCY",
        movement: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${voxels[1].id}::COLOR`,
        mac: generateRandomMac(), // Add random MAC address
        type: "COLOR",
        movement: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${voxels[1].id}::TRANSPARENCY`,
        mac: generateRandomMac(), // Add random MAC address
        type: "TRANSPARENCY",
        movement: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${voxels[2].id}::COLOR`,
        mac: generateRandomMac(), // Add random MAC address
        type: "COLOR",
        movement: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${voxels[2].id}::TRANSPARENCY`,
        mac: generateRandomMac(), // Add random MAC address
        type: "TRANSPARENCY",
        movement: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("motors", motors)

    // Seed data for Sensor
    const sensors = [
      {
        id: `${modules[0].id}::ULTRASOUND`,
        type: "ULTRASOUND",
        moduleId: modules[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${modules[0].id}::MICROPHONE`,
        type: "MICROPHONE",
        moduleId: modules[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${modules[1].id}::ULTRASOUND`,
        type: "ULTRASOUND",
        moduleId: modules[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${modules[1].id}::MICROPHONE`,
        type: "MICROPHONE",
        moduleId: modules[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${modules[2].id}::ULTRASOUND`,
        type: "ULTRASOUND",
        moduleId: modules[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `${modules[2].id}::MICROPHONE`,
        type: "MICROPHONE",
        moduleId: modules[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("sensors", sensors)

    // Seed data for SensorReading
    const sensorReadings = []

    sensors.forEach((sensor) => {
      for (let i = 0; i < 3; i++) {
        sensorReadings.push({
          id: uuidv4(),
          value: Math.random() * 100,
          processed: false,
          type: sensor.type,
          sensorId: sensor.id,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    })

    await queryInterface.bulkInsert("sensor_readings", sensorReadings)
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries
    await queryInterface.bulkDelete("sensor_readings", null, {})
    await queryInterface.bulkDelete("motors", null, {})
    await queryInterface.bulkDelete("sensors", null, {})
    await queryInterface.bulkDelete("voxels", null, {})
    await queryInterface.bulkDelete("modules", null, {})
  }
}
