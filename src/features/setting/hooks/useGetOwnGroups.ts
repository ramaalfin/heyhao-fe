import { useQuery } from "@tanstack/react-query";
import { getOwnGroups } from "../api/getOwnGroups";

export const useGetOwnGroups = () => {
  const {
    data: ownGroups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["own-groups"],
    queryFn: () => getOwnGroups(),
    select: (data) => data.data.data,
  });

  return {
    ownGroups,
    isLoading,
    error,
  };
};
