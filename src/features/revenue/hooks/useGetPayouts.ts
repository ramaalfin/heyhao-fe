import { useQuery } from "@tanstack/react-query";
import { getPayouts } from "../api/getPayouts";

export const useGetPayouts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["payouts"],
        queryFn: () => getPayouts(),
        select: (data) => data,
    });

    return {
        data,
        isLoading,
        error,
    };
};
