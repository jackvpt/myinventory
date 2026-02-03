/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const categorySchema = new mongoose.Schema(
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
  "Category",
  categorySchema,
) /** 'Category' is the collection name which becomes 'Categories' */
