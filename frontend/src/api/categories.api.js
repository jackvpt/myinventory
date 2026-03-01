import CategoryModel from "../models/CategoryModel"
import {  COMMON_API_URL } from "./common_url"

const API_URL = COMMON_API_URL

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`)

  if (!response.ok) {
    throw new Error("Error while loading categories")
  }

  const data = await response.json()

  // 🔁 API → Model
  return data.map((item) => new CategoryModel(item))
}

export const createCategory = async (category) => {
  const model = category instanceof CategoryModel ? category : new CategoryModel(category)

  if (!model.isValid()) {
    throw new Error("Data invalid")
  }

  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(model.toPayload()),
  })

  if (!response.ok) {
    throw new Error("Error while creating category")
  }

  const data = await response.json()

  // 🔁 Backend → Model
  return new CategoryModel(data)
}
