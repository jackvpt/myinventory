import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createLocation, fetchLocations } from "../api/locationsapi"

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  })
}

export const useCreateLocation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      // Refresh automatically the locations
      queryClient.invalidateQueries({ queryKey: ["locations"] })
    },
  })
}
