import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchItems,
  createItem,
  deleteItem,
  updateItem,
} from "../api/items.api"

export const useItems = () => {
  const query = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  })

  // Calcul des 3 locations les plus utilisées
  const topLocations = query.data
    ? Object.entries(
        query.data.reduce((acc, item) => {
          const loc = item.mainlocation
          if (!loc) return acc
          acc[loc] = (acc[loc] || 0) + 1
          return acc
        }, {}),
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([loc]) => loc)
    : []

  return {
    ...query,
    topLocations,
  }
}

export const useCreateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      // Refresh automatically the inventory
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteItem, // deleteItem(id) returns the deleted id
    onSuccess: () => {
      // Refresh the items list after deletion
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
    onError: (err) => {
      console.error("Error deleting item:", err)
    },
  })
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, item }) => updateItem({ id, item }),

    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
      console.log("Item updated:", updatedItem)
    },

    onError: (err) => {
      console.error("Error updating item:", err)
    },
  })
}
