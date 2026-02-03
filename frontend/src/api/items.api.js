import ItemModel from "../models/ItemModel"

const API_URL = import.meta.env.VITE_API_URL

export const fetchItems = async () => {
  const response = await fetch(`${API_URL}/items`)

  if (!response.ok) {
    throw new Error("Error while loading inventory")
  }

  const data = await response.json()

  // 🔁 API → Model
  return data.map((item) => new ItemModel(item))
}

export const createItem = async (item) => {
  const model = item instanceof ItemModel ? item : new ItemModel(item)

  if (!model.isValid()) {
    throw new Error("Data invalid")
  }

  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(model.toPayload()),
  })

  if (!response.ok) {
    throw new Error("Error while creating item")
  }

  const data = await response.json()

  // 🔁 Backend → Model
  return new ItemModel(data)
}
