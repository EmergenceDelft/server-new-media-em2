// seeders/demo-seed.js
"use strict"

const { v4: uuidv4 } = require("uuid")

module.exports = {
  up: async (queryInterface) => {
    // Seed data for Module
    const modules = [
      {
        id: "95:16:91:a0:ce:4b",
        position_x: 0.5,
        position_y: 0.2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "a4:98:b3:14:c9:7f",
        position_x: 0.2,
        position_y: 0.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "f4:e3:ca:f7:3b:09",
        position_x: 0.7,
        position_y: 0.1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("modules", modules)

    // Seed data for Voxel
    const voxels = [
      {
        id: uuidv4(),
        moduleId: modules[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        moduleId: modules[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        moduleId: modules[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("voxels", voxels)

    // Seed data for ColourMotor and TransparencyMotor
    const colourMotors = [
      {
        id: uuidv4(),
        minAngle: 0,
        maxAngle: 180,
        rotationIncrement: 1,
        minJitterIncrement: -2,
        maxJitterIncrement: 5,
        voxelId: voxels[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        minAngle: 0,
        maxAngle: 180,
        rotationIncrement: 1,
        minJitterIncrement: -2,
        maxJitterIncrement: 5,
        voxelId: voxels[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        minAngle: 0,
        maxAngle: 180,
        rotationIncrement: 1,
        minJitterIncrement: -2,
        maxJitterIncrement: 5,
        voxelId: voxels[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("colour_motors", colourMotors)

    const transparencyMotors = [
      {
        id: uuidv4(),
        activeAngle: 45,
        inactiveAngle: 90,
        voxelId: voxels[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        activeAngle: 45,
        inactiveAngle: 90,
        voxelId: voxels[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        activeAngle: 45,
        inactiveAngle: 90,
        voxelId: voxels[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("transparency_motors", transparencyMotors)

    // Seed data for Entanglement
    const entanglements = [
      {
        id: uuidv4(),
        moduleId: modules[0].id,
        relatedModuleId: modules[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        moduleId: modules[2].id,
        relatedModuleId: modules[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("entanglements", entanglements)

    console.log("Seeding completed!")
  },

  down: async (queryInterface) => {
    // Remove all entries
    await queryInterface.bulkDelete("entanglements", null, {})
    await queryInterface.bulkDelete("transparency_motors", null, {})
    await queryInterface.bulkDelete("colour_motors", null, {})
    await queryInterface.bulkDelete("voxels", null, {})
    await queryInterface.bulkDelete("modules", null, {})
  }
}
