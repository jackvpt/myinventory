/** Imports */
const mongoose = require('mongoose');
const Item = require("../models/Item")

const fs = require("fs")

/** GET All Items */
exports.getAllItems = async (req, res) => {
  try {
    const allItems = await Item.find()
    res.status(200).json(allItems)
    console.log(`${allItems.length} items retrieved`)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error retrieving items." })
  }
}

/** POST New Item */
exports.createItem = async (req, res) => {
  const itemObject = req.body

  try {
    const item = new Item({
      ...itemObject,
    })

    await item.save()

    res.status(201).json(item)
    console.log(
      `Item created: ${item.label} - ${item.location}`
    )
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error adding item!" })
  }
}

/** PUT Update Item */
exports.updateItem = async (req, res) => {
  const itemObject = req.body

  try {
    const item = await Item.findOne({ _id: req.params.id })

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { ...itemObject, _id: req.params.id },
      { new: true }
    )

    res.status(200).json(updatedItem)
    console.log(
      `Item updated: ${updatedItem._id} - ${updatedItem.label}`
    )
  } catch (error) {
    res.status(401).json({ error })
  }
}

/** DELETE One Item */
exports.deleteItem = async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id })

    res.status(200).json({ message: "Item deleted successfully!" })
    console.log(`Item deleted: ${req.params.id}`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error deleting item!" })
  }
}

/** DELETE Multiple Items */
exports.deleteItems = async (req, res) => {
  const { ids } = req.body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "A non-empty array of IDs is required." })
  }

  try {
    const result = await Item.deleteMany({ _id: { $in: ids } })

    res.status(200).json({
      message: "Items deleted successfully!",
      deletedCount: result.deletedCount,
    })

    console.log(
      `Deleted ${result.deletedCount} items: ${ids.join(", ")}`
    )
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error deleting items!",
    })
  }
}


