/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const itemSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true, // enlève les espaces inutiles
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // la quantité ne peut pas être négative
    },
    location: {
      type: String,
      required: true,
      trim: true,
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
