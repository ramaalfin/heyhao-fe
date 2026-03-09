import { useQuery } from "@tanstack/react-query";
import { getDetailGroup } from "../api/getDetailGroup";

export const useGetDetailGroup = (id: string) => {
  const {
    data: detailGroup,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["detail-group", id],
    queryFn: () => getDetailGroup(id),
    select: (data) => data.data.data,
  });

  return {
    detailGroup,
    isLoading,
    error,
  };
};
