/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // remove whitespace
    },
  },
  {
    timestamps: true,
  },
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "Type",
  typeSchema,
) /** 'Type' is the collection name which becomes 'Types' */