import db from "../models/index.js" // Assuming this imports your Sequelize models
import sequelize from "../services/db.js"
import { Op } from "sequelize"

const macAddressLength = 17

export async function processDatabaseEntries(newEntries, clients) {
  const updatedMotors = await updateMotorsInDB(newEntries, clients)

  if (updatedMotors) {
    for (let i = 0; i < clients.length; i++) {
      const mac_websocket = clients[i].mac_address
      const filteredMotorsDegrees = updatedMotors
        .filter((x) => x.dataValues.mac == mac_websocket)
        .map((x) => x.dataValues)

      clients[i].send(motorsToJson(filteredMotorsDegrees))
    }
  }
}

async function updateMotorsInDB(newEntries, clients) {
  //split newEntries into sensor and microphone entries

  const micReadings = newEntries.filter(
    (reading) => reading.type == "MICROPHONE"
  )
  const proximityReadings = newEntries.filter(
    (reading) => reading.type == "ULTRASOUND"
  )
  //dataTypes ENUM here please, TODO

  let motors1 = updateMotorsBasedOnProximity(proximityReadings, clients)
  //let motors2 = updateMotorsBasedOnMicrophone(micReadings, clients)
  //possible for EXTENSION HERE

  return motors1
}

async function updateMotorsBasedOnProximity(readings, clients) {
  const isOverThreshold = readings.some((reading) => reading.value >= 0.1)
  let macs = clients.map((client) => client.mac_address)
  if (isOverThreshold) {
    //far proximity
    let motors1 = await dbUpdateAllTransparencyFilters(macs, 90)
    let motors2 = await dbUpdateAllColorFilters(macs, true) //boolean which means start moving
    return interleave(motors1, motors2)
  } else {
    //near proximity
    let motors1 = await dbUpdateAllTransparencyFilters(macs, 0)
    let motors2 = await dbUpdateAllColorFilters(macs, false) //bolean which means stop moving
    return interleave(motors1, motors2)
  }
}

async function dbUpdateAllTransparencyFilters(macs, angle) {
  const transaction = await sequelize.transaction()
  try {
    const [numberOfAffectedRows, affectedRows] = await db.Motor.update(
      { angle: angle }, // Set angle to angle
      {
        where: {
          [Op.and]: [
            { type: "TRANSPARENCY" }, // Constrain the type to PROXIMITY
            { mac: { [Op.in]: macs } } // Check if mac is present in the macs array
          ]
        },
        returning: true,
        transaction
      } // sequelize interprets this as module_mac_address matches at least one value in macs
    )
    await transaction.commit()
    console.log("All motors updated succesfully")
    return affectedRows
  } catch (error) {
    await transaction.rollback()
    console.error("Error updating Motors object:", error)
    return null
  }
}

async function dbUpdateAllColorFilters(macs, moving) {
  const transaction = await sequelize.transaction()
  try {
    const [numberOfAffectedRows, affectedRows] = await db.Motor.update(
      { movement: moving }, // Set the movement to the moving variable, true if far_proximity, false if close_proximit
      {
        where: {
          [Op.and]: [
            { type: "COLOR" }, // Constrain the type to PROXIMITY
            { mac: { [Op.in]: macs } } // Check if mac is present in the macs array
          ]
        },
        returning: true,
        transaction
      } // sequelize interprets this as module_mac_address matches at least one value in macs
    )
    await transaction.commit()
    console.log("All motors updated succesfully")
    return affectedRows
  } catch (error) {
    await transaction.rollback()
    console.error("Error updating Motors object:", error)
    return null
  }
}

function interleave(array1, array2) {
  const maxLength = Math.max(array1.length, array2.length)
  const result = []

  for (let i = 0; i < maxLength; i++) {
    if (i < array1.length) {
      result.push(array1[i])
    }
    if (i < array2.length) {
      result.push(array2[i])
    }
  }

  return result
}
function motorsToJson(filteredMotors) {
  const jsonMotorsArray = filteredMotors.map((data_values, index) => ({
    motor_address: index,
    angle: data_values.angle,
    movement: data_values.movement
  }))

  const jsonMotorFinal = {
    type: "motor_commands",
    motors: jsonMotorsArray
  }

  return JSON.stringify(jsonMotorFinal)
}
