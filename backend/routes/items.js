/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const itemsCtrl = require("../controllers/items")

/** Set routes */
router.get("/", itemsCtrl.getAllItems)
router.post("/", multer().none(), itemsCtrl.createItem)
router.put("/:id", multer().none(), itemsCtrl.updateItem)
router.delete("/:id", itemsCtrl.deleteItem)
router.post("/bulk-delete", itemsCtrl.deleteItems)

module.exports = router
