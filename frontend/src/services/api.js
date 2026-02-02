const API_URL = import.meta.env.VITE_API_URL

export const fetchItems = async () => {
  const response = await fetch(`${API_URL}/items`)

  if (!response.ok) {
    throw new Error("Erreur lors du chargement de l'inventaire")
  }

  return response.json()
}

export const createItem = async (item) => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })

  if (!response.ok) {
    throw new Error("Erreur lors de la création")
  }

  return response.json()
}
