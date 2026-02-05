/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const typesCtrl = require("../controllers/types")

/** Set routes */
router.get("/", typesCtrl.getAllTypes)


module.exports = router
