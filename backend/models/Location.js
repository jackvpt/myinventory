/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // avoid duplicate locations
    },
    sublocations: {
      type: [String], // array of strings
      default: [], // allow empty sublocations
    },
  },
  {
    timestamps: true,
  },
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "Location",
  locationSchema,
) /** 'Location' is the collection name which becomes 'Locations' */
