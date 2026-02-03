import LocationModel from "../models/LocationModel"

const API_URL = import.meta.env.VITE_API_URL

export const fetchLocations = async () => {
  const response = await fetch(`${API_URL}/locations`)

  if (!response.ok) {
    throw new Error("Error while loading locations")
  }

  const data = await response.json()

  // 🔁 API → Model
  return data.map((item) => new LocationModel(item))
}

export const createLocation = async (location) => {
  const model = location instanceof LocationModel ? location : new LocationModel(location)
  if (!model.isValid()) {
    throw new Error("Data invalid")
  }

  const response = await fetch(`${API_URL}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(model.toPayload()),
  })

  if (!response.ok) {
    throw new Error("Error while creating location")
  }

  const data = await response.json()

  // 🔁 Backend → Model
  return new LocationModel(data)
}
