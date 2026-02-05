/** Imports */
const mongoose = require('mongoose');
const Type = require("../models/Type")

const fs = require("fs")

/** GET All Types */
exports.getAllTypes = async (req, res) => {
  try {
    const allTypes = await Type.find()
    res.status(200).json(allTypes)
    console.log(`${allTypes.length} types retrieved`)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error retrieving types." })
  }
}
