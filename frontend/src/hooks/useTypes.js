import { useQuery } from "@tanstack/react-query"
import { fetchTypes } from "../api/types.api"

export const useTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
  })
}
