import db from "../models/index.js" // Assuming this imports your Sequelize models
import sequelize from "../services/db.js"
import { Op } from "sequelize"

const macAddressLength = 17

export async function processDatabaseEntries(newEntries, clients) {
  await updateMotorsInDB(newEntries, clients)

  let macs = clients.map((client) => client.mac_address)
  let newMacs = await getAllEntangled(macs)

  console.log("we would like to send to these macs")
  console.log(newMacs)

  newMacs = macs
  let updatedMotors = await getAllMotors()

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

const extractMacAddress = (sensorId) => {
  return sensorId.split("::")[0]
}

async function updateMotorsInDB(newEntries, clients) {
  //split newEntries into sensor and microphone entries

  const micReadings = newEntries.filter(
    (reading) => reading.type === "MICROPHONE"
  )
  const proximityReadings = newEntries.filter(
    (reading) => reading.type === "ULTRASOUND"
  )

  for (const client of clients) {
    let mic1 = micReadings.filter(
      (x) => extractMacAddress(x.sensorId) == client.mac_address
    )
    let prox1 = proximityReadings.filter(
      (x) => extractMacAddress(x.sensorId) == client.mac_address
    )
    await updateMotorsBasedOnProximity(prox1, [client])
    await updateMotorsBasedOnMicrophone(mic1, [client])
  }
  //   update(readings, client)
  //   update(readings, client)
  // }

  // await updateMotorsBasedOnProximity(proximityReadings, clients)
  // await updateMotorsBasedOnMicrophone(micReadings, clients)

  //TODO combine motors 1 and motors 2
}

async function updateMotorsBasedOnMicrophone(readings, clients) {
  const isNoisy = readings.some((reading) => reading.value >= 500)
  let macs = clients.map((client) => client.mac_address)
  if (isNoisy) {
    //noisy
    //set all auto and auto jittery to auto jittery
    //or set all color motors to auto jittery
    let motors2 = await dbUpdateAutoJitter(macs, "COLOR", true) //move continously with jitter,
    //true means select only
    console.log("--------------------------")
    console.log("noisy")
    return motors2
  } else {
    //quiet
    let motors2 = await dbUpdateAuto(macs, "COLOR", true) //move continously without jitter
    console.log("--------------------------")
    console.log("quiet")
    return motors2
  }
}

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
    let motors1 = await dbUpdateManual(macs, "TRANSPARENCY", 50)
    let motors2 = await dbUpdateAuto(macs, "COLOR", false) //boolean which means start moving
    console.log("--------------------------")
    console.log("far proximity")
    return interleave(motors1, motors2)
  } else {
    //near proximity
    let motors1 = await dbUpdateManual(macs, "TRANSPARENCY", 0)

    //from each mac get current angle
    let angleMapping = await getCurrentAngles(macs)

    let updatePromises = macs.map((mac) => {
      const angle = angleMapping[mac]
      return dbUpdateManual([mac], "COLOR", angle)
    })
    let motors2 = await Promise.all(updatePromises)
    //this is where we need to make new function
    //to get all entangled motors

    //TODO
    //for each firstMac in macs
    //get entangledMacs
    //set firstMac angle to firstMac current angle (from database)
    //set entangledMacs angles to firstMac's current angle

    console.log("--------------------------")
    console.log("near proximity")
    return interleave(motors1, motors2)
  }
}

async function dbUpdateManual(macs, type, angle) {
  const transaction = await sequelize.transaction()
  try {
    const [numberOfAffectedRows, affectedRows] = await db.Motor.update(
      {
        angle: angle, // Set angle to angle
        movement: "MANUAL" // Set movement to "MANUAL"
      },
      {
        where: {
          [Op.and]: [
            { type: type }, // Constrain the type to PROXIMITY
            { mac: { [Op.in]: macs } } // Check if mac is present in the macs array
          ]
        },
        returning: true,
        transaction
      } // sequelize interprets this as module_mac_address matches at least one value in macs
    )
    await transaction.commit()
    return affectedRows
  } catch (error) {
    await transaction.rollback()
    console.error("Error updating Motors object:", error)
    return null
  }
}

async function dbUpdateAuto(macs, type, onlySome) {
  const transaction = await sequelize.transaction()
  try {
    // Construct the base where clause
    const baseWhereClause = {
      [Op.and]: [
        { type: type }, // Constrain the type
        { mac: { [Op.in]: macs } } // Check if mac is present in the macs array
      ]
    }

    // Add additional condition if onlySome is true
    if (onlySome) {
      baseWhereClause[Op.and].push({
        movement: {
          [Op.in]: ["AUTO", "AUTOJITTER"] // Only update motors with movement "AUTO" or "AUTOJITTER"
        }
      })
    }

    const [numberOfAffectedRows, affectedRows] = await db.Motor.update(
      { movement: "AUTO" }, // Set the movement to "AUTO"
      {
        where: baseWhereClause,
        returning: true,
        transaction
      }
    )

    await transaction.commit()
    return affectedRows
  } catch (error) {
    await transaction.rollback()
    console.error("Error updating Motors object:", error)
    return null
  }
}

async function dbUpdateAutoJitter(macs, type) {
  const transaction = await sequelize.transaction()
  try {
    const [numberOfAffectedRows, affectedRows] = await db.Motor.update(
      { movement: "AUTOJITTER" }, // Set the movement to the moving variable, true if far_proximity, false if close_proximit
      {
        where: {
          [Op.and]: [
            { type: type }, // Constrain the type to COLOR
            { mac: { [Op.in]: macs } } // Check if mac is present in the macs array
          ]
        },
        returning: true,
        transaction
      } // sequelize interprets this as module_mac_address matches at least one value in macs
    )
    await transaction.commit()
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

    if (data_values.id !== null) {
      motorData.id = data_values.id
    }

    if (data_values.type !== null) {
      motorData.type = data_values.type
    }
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

async function getAllMotors() {
  try {
    const motors = await db.Motor.findAll()
    return motors
  } catch (error) {
    console.error("Error fetching motors:", error)
  }
}

async function getCurrentAngles(macs) {
  try {
    const motors = await db.Motor.findAll({
      attributes: ["mac", "angle"],
      where: {
        [Op.and]: [{ mac: { [Op.in]: macs } }, { type: "COLOR" }]
      }
    })
    return motors.reduce((acc, motor) => {
      acc[motor.mac] = motor.angle
      return acc
    }, {})
  } catch (error) {
    console.error("Error fetching current angles:", error)
    return {}
  }
}
