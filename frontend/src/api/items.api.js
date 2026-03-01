import axios from "axios"
import ItemModel from "../models/ItemModel"
import { COMMON_API_URL } from "./common_url"

const API_URL = COMMON_API_URL

// Create an Axios instance for easier configuration
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
})

// ----------------------------
// Fetch all items
// ----------------------------
export const fetchItems = async () => {
  // GET request to /items
  const { data } = await api.get("/items")

  // Convert each API object into an ItemModel instance
  return data.map((item) => new ItemModel(item))
}

// ----------------------------
// Create a new item
// ----------------------------
export const createItem = async (item) => {
  // Ensure we are working with an ItemModel
  const model = item instanceof ItemModel ? item : new ItemModel(item)

  // Validate the item before sending to API
  if (!model.isValid()) throw new Error("Data invalid")

  // POST request to /items with JSON payload
  const { data } = await api.post("/items", model.toPayload())

  // Return a new ItemModel instance from backend response
  return new ItemModel(data)
}

// ----------------------------
// Delete an item by ID
// ----------------------------
export const deleteItem = async (id) => {
  // DELETE request to /items/:id
  await api.delete(`/items/${id}`)

  // Return the deleted item ID for tracking
  return id
}

// ----------------------------
// Update an existing item
// ----------------------------
export const updateItem = async ({ id, item }) => {
  const { data } = await api.put(`/items/${id}`, item)
  return new ItemModel(data)
}
