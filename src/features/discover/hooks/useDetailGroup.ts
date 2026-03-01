import { useQuery } from "@tanstack/react-query";
import { getDetailGroup } from "../api/getDetailGroup";

export const useDetailGroup = (id: string, isEnabled: boolean = true) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["detail-group", id],
        queryFn: () => getDetailGroup(id),
        select: (data) => data.data,
        enabled: isEnabled && !!id
    });

    return {
        data,
        isLoading,
        error
    };
};
