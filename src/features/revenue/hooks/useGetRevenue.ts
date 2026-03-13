import { useQuery } from "@tanstack/react-query";
import { getRevenue } from "../api/getRevenue";

export const useGetRevenue = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["revenue"],
    queryFn: () => getRevenue(),
    select: (data) => data.data,
  });

  return {
    data,
    isLoading,
    error,
  };
};
