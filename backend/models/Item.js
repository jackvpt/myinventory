/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const itemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true, // remove whitespace
    },
    type: {
      type: String,
      required: true,
      trim: true, // remove whitespace
    },
    label: {
      type: String,
      required: true,
      trim: true, // remove whitespace
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // quantity cannot be negative
    },
    mainlocation: {
      type: String,
      required: true,
      trim: true, // remove whitespace
    },
    sublocation: {
      type: String,
      trim: true, // remove whitespace
    },
    status: {
      type: Number,
      required: true,
      default: 100, // default status is 100 (available)
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "Item",
  itemSchema,
) /** 'Item' is the collection name which becomes 'Items' */
