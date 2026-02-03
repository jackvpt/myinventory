/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const locationsCtrl = require("../controllers/locations")

/** Set routes */
router.get("/", locationsCtrl.getAllLocations)
router.post("/", multer().none(), locationsCtrl.createLocation)
router.put("/:id", multer().none(), locationsCtrl.updateLocation)
router.delete("/:id", locationsCtrl.deleteLocation)
router.post("/bulk-delete", locationsCtrl.deleteLocations)

module.exports = router
