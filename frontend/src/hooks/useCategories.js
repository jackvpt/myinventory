import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory, fetchCategories } from "../api/categories.api"

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Refresh automatically the categories
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })
}
