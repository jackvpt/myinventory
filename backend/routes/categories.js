/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const categoriesCtrl = require("../controllers/categories")

/** Set routes */
router.get("/", categoriesCtrl.getAllCategories)
router.post("/", multer().none(), categoriesCtrl.createCategory)
router.put("/:id", multer().none(), categoriesCtrl.updateCategory)
router.delete("/:id", categoriesCtrl.deleteCategory)
router.post("/bulk-delete", categoriesCtrl.deleteCategories)

module.exports = router
