import TypeModel from "../models/TypeModel"
import { COMMON_API_URL } from "./common_url"

const API_URL = COMMON_API_URL

export const fetchTypes = async () => {
  const response = await fetch(`${API_URL}/types`)

  if (!response.ok) {
    throw new Error("Error while loading types")
  }

  const data = await response.json()

  // 🔁 API → Model
  return data.map((item) => new TypeModel(item))
}
