import db from "../models/index.js"

const Motor = db.Motor

// Exports a createModule function which can be used in the app
export async function createMotor(voxel_id, cnt, ty, mac) {
  try {
    Motor.create({
      id: voxel_id + "::MOTOR_" + cnt,
      voxelId: voxel_id,
      type: ty,
      mac: mac
    })
  } catch (error) {
    console.log(error)
  }
}

export async function updateMotor(id, value) {
  try {
    // Update the angle for all motors with the specified id
    const [updatedCount] = await Motor.update(
      { angle: value },
      {
        where: {
          id: id
        }
      }
    )

    // Check if any rows were updated
    if (updatedCount > 0) {
      console.log(`Successfully updated ${updatedCount} motor(s) with id ${id}`)
    } else {
      console.log(`No motors found with id ${id}`)
    }
  } catch (error) {
    console.error("Error updating motors:", error)
  }
}
