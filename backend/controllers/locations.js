/** Imports */
const mongoose = require('mongoose');
const Location = require("../models/Location")

const fs = require("fs")

/** GET All Locations */
exports.getAllLocations = async (req, res) => {
  try {
    const allLocations = await Location.find()
    res.status(200).json(allLocations)
    console.log(`${allLocations.length} locations retrieved`)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error retrieving locations." })
  }
}

/** POST New Location */
exports.createLocation = async (req, res) => {
  const locationObject = req.body

  try {
    const location = new Location({
      ...locationObject,
    })

    await location.save()

    res.status(201).json(location)
    console.log(
      `Location created: ${location.name}`
    )
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error adding location!" })
  }
}

/** PUT Update Location */
exports.updateLocation = async (req, res) => {
  const locationObject = req.body

  try {
    const location = await Location.findOne({ _id: req.params.id })

    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { ...locationObject, _id: req.params.id },
      { new: true }
    )

    res.status(200).json(updatedLocation)
    console.log(
      `Location updated: ${updatedLocation.name}`
    )
  } catch (error) {
    res.status(401).json({ error })
  }
}

/** DELETE One Location */
exports.deleteLocation = async (req, res) => {
  try {
    await Location.deleteOne({ _id: req.params.id })

    res.status(200).json({ message: "Location deleted successfully!" })
    console.log(`Location deleted: ${req.params.id}`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error deleting location!" })
  }
}

/** DELETE Multiple Locations */
exports.deleteLocations = async (req, res) => {
  const { ids } = req.body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "A non-empty array of IDs is required." })
  }

  try {
    const result = await Location.deleteMany({ _id: { $in: ids } })

    res.status(200).json({
      message: "Locations deleted successfully!",
      deletedCount: result.deletedCount,
    })

    console.log(
      `Deleted ${result.deletedCount} locations: ${ids.join(", ")}`
    )
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error deleting locations!",
    })
  }
}


