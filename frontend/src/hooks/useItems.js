import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchItems,
  createItem,
  deleteItem,
  updateItem,
} from "../api/items.api"
import ItemModel from "../models/ItemModel"

const invalidateItems = (client) =>
  client.invalidateQueries({ queryKey: ["items"] })

// ----------------------------
// Fetch all items
// ----------------------------
export const useItems = () => {
  const query = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const items = await fetchItems()
      // Assure que toutes les données sont des ItemModel
      return items.map((i) => (i instanceof ItemModel ? i : new ItemModel(i)))
    },
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 minute
  })

  // Calcul des 3 locations les plus utilisées
  const topLocations = query.data
    ? Object.entries(
        query.data.reduce((acc, item) => {
          if (!item.mainlocation) return acc
          acc[item.mainlocation] = (acc[item.mainlocation] || 0) + 1
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

// ----------------------------
// Create a new item
// ----------------------------
export const useCreateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createItem,

    onSuccess: () => {
      invalidateItems(queryClient)
    },

    onError: (error) => {
      console.error("Create error:", error?.message || error)
    },
  })
}

// ----------------------------
// Delete an item
// ----------------------------
export const useDeleteItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteItem,

    onSuccess: () => {
      invalidateItems(queryClient)
    },

    onError: (error) => {
      console.error("Delete error:", error?.message || error)
    },
  })
}

// ----------------------------
// Update an existing item
// ----------------------------
export const useUpdateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, item }) => updateItem({ id, item }),

    onMutate: async ({ id, item }) => {
      await queryClient.cancelQueries({ queryKey: ["items"] })

      const previousItems = queryClient.getQueryData(["items"]) || []

      queryClient.setQueryData(["items"], (old = []) =>
        old.map((i) => (i.id === id ? new ItemModel({ ...i, ...item }) : i)),
      )

      return { previousItems }
    },

    onError: (error, _vars, context) => {
      console.error("Update error:", error)

      if (context?.previousItems) {
        queryClient.setQueryData(["items"], context.previousItems)
      }
    },

    onSettled: () => {
      invalidateItems(queryClient)
    },
  })
}
