import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchItems,
  createItem,
  deleteItem,
  updateItem,
} from "../api/items.api"
import ItemModel from "../models/ItemModel"
import { useNotification } from "./useNotification"

const invalidateItems = (client) =>
  client.invalidateQueries({ queryKey: ["items"] })

const useMutationWithNotification = (config) => {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotification()

  return useMutation({
    ...config,

    onSuccess: (data, variables, context) => {
      if (config.successMessage) {
        notifySuccess(
          typeof config.successMessage === "function"
            ? config.successMessage(data)
            : config.successMessage,
        )
      }

      config.onSuccess?.(data, variables, context)
    },

    onError: (error, variables, context) => {
      const message =
        error?.message || config.errorMessage || "Une erreur est survenue"

      notifyError(message)
      config.onError?.(error, variables, context)
    },

    onSettled: (data, error, variables, context) => {
      if (config.invalidate !== false) {
        invalidateItems(queryClient)
      }

      config.onSettled?.(data, error, variables, context)
    },
  })
}

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
export const useCreateItem = () =>
  useMutationWithNotification({
    mutationFn: createItem,
    successMessage: "Item ajouté",
    errorMessage: "Erreur lors de la création",
  })

// ----------------------------
// Delete an item
// ----------------------------
export const useDeleteItem = () =>
  useMutationWithNotification({
    mutationFn: deleteItem,
    successMessage: "Item supprimé",
    errorMessage: "Erreur lors de la suppression",
  })

// ----------------------------
// Update an existing item
// ----------------------------
export const useUpdateItem = () => {
  const queryClient = useQueryClient()

  return useMutationWithNotification({
    mutationFn: ({ id, item }) => updateItem({ id, item }),

    successMessage: (data) =>
      data?.name ? `Item "${data.name}" mis à jour` : "Item mis à jour",

    errorMessage: "Erreur lors de la mise à jour",

    onMutate: async ({ id, item }) => {
      await queryClient.cancelQueries({ queryKey: ["items"] })

      const previousItems = queryClient.getQueryData(["items"])

      queryClient.setQueryData(["items"], (old = []) =>
        old.map((i) => (i.id === id ? new ItemModel({ ...i, ...item }) : i)),
      )

      return { previousItems }
    },

    onError: (error, _vars, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["items"], context.previousItems)
      }
    },
  })
}
