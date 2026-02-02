import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchItems, createItem } from "../services/api"

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
      // Rafraîchit automatiquement l'inventaire
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}
