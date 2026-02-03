/** Imports */
const mongoose = require('mongoose');
const Category = require("../models/Category")

const fs = require("fs")

/** GET All Categories */
exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find()
    res.status(200).json(allCategories)
    console.log(`${allCategories.length} categories retrieved`)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error retrieving categories." })
  }
}

/** POST New Category */
exports.createCategory = async (req, res) => {
  const categoryObject = req.body

  try {
    const category = new Category({
      ...categoryObject,
    })

    await category.save()

    res.status(201).json(category)
    console.log(
      `Category created: ${category.name}`
    )
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error adding category!" })
  }
}

/** PUT Update Category */
exports.updateCategory = async (req, res) => {
  const categoryObject = req.body

  try {
    const category = await Category.findOne({ _id: req.params.id })

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { ...categoryObject, _id: req.params.id },
      { new: true }
    )

    res.status(200).json(updatedCategory)
    console.log(
      `Category updated: ${updatedCategory.name}`
    )
  } catch (error) {
    res.status(401).json({ error })
  }
}

/** DELETE One Category */
exports.deleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id })

    res.status(200).json({ message: "Category deleted successfully!" })
    console.log(`Category deleted: ${req.params.id}`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error deleting category!" })
  }
}

/** DELETE Multiple Categories */
exports.deleteCategories = async (req, res) => {
  const { ids } = req.body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "A non-empty array of IDs is required." })
  }

  try {
    const result = await Category.deleteMany({ _id: { $in: ids } })

    res.status(200).json({
      message: "Categories deleted successfully!",
      deletedCount: result.deletedCount,
    })

    console.log(
      `Deleted ${result.deletedCount} categories: ${ids.join(", ")}`
    )
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error deleting categories!",
    })
  }
}


