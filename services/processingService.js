import db from "../models/index.js" // Assuming this imports your Sequelize models
import sequelize from "../services/db.js"
import { Op } from "sequelize"

const macAddressLength = 17

export async function processDatabaseEntries(newEntries, clients) {
  const updatedMotors = await updateMotorsInDB(newEntries, clients)

  let macs = clients.map((client) => client.mac_address)
  let newMacs = await getAllEntangled(macs)

  console.log("we would like to send to these macs")
  console.log(newMacs)

  if (updatedMotors) {
    console.log("hello")
    const clientsToSend = clients.filter((client) =>
      newMacs.includes(client.mac_address)
    )

    // Iterate over filtered clients and send data
    clientsToSend.forEach((client) => {
      const mac_websocket = client.mac_address
      const filteredMotorsDegrees = updatedMotors
        .filter((x) => x.dataValues.mac === mac_websocket)
        .map((x) => x.dataValues)

      client.send(motorsToJson(filteredMotorsDegrees))
      console.log("----------")
      console.log("sending to")
      console.log(client.mac_address)
    })
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

  //this could be done in the future, server side processing of microphone
  //for now it was easier and quicker to do it just client side
  //but there are more interesting ways to process audios from many sources

  //TODO also combine motors 1 and motors 2, this is a bit hard, be careful with ordering of the arrays
  return motors1
}

// async function updateMotorsBasedOnMicrophone(readings, clients) {}

async function updateMotorsBasedOnProximity(readings, clients) {
  //clients of type websoscket client
  const isClose = readings.some(
    (reading) => reading.value <= 50 && reading.value != 0
  )

  //here macs from all entangled
  let macs = clients.map((client) => client.mac_address)
  let newMacs = await getAllEntangled(macs)
  console.log("--------------------------------")
  console.log(newMacs)
  if (!isClose) {
    //far proximity
    let motors1 = await dbUpdateAllTransparencyFilters(newMacs, 90)
    let motors2 = await dbUpdateAllColorFilters(newMacs, true) //boolean which means start moving
    console.log("--------------------------")
    console.log("far proximity")
    return interleave(motors1, motors2)
  } else {
    //near proximity
    let motors1 = await dbUpdateAllTransparencyFilters(newMacs, 0)
    let motors2 = await dbUpdateAllColorFilters(newMacs, false) //bolean which means stop moving
    console.log("--------------------------")
    console.log("near proximity")
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
  const jsonMotorsArray = filteredMotors.map((data_values, index) => {
    const motorData = { motor_address: index }

    if (data_values.angle !== null) {
      motorData.angle = data_values.angle
    }

    if (data_values.movement !== null) {
      motorData.movement = data_values.movement
    }

    return motorData
  })

  const jsonMotorFinal = {
    type: "motor_commands",
    motors: jsonMotorsArray
  }

  return JSON.stringify(jsonMotorFinal)
}

async function getAllEntangled(macs) {
  try {
    const modules = await db.Module.findAll({
      where: {
        id: {
          [Op.in]: macs
        }
      },
      include: [
        {
          model: db.Module,
          as: "entangledModule",
          attributes: ["id"]
        }
      ]
    })

    // Collect the associated entangled module IDs
    const associatedModuleIds = new Set()
    modules.forEach((module) => {
      module.entangledModule.forEach((em) => associatedModuleIds.add(em.id))
    })

    return Array.from(associatedModuleIds)
  } catch (error) {
    console.error("Error in getAllEntangled:", error)
    throw error
  }
}
