import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchItems, createItem } from "../api/items.api"

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  })
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
