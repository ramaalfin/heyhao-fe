import { useQuery } from "@tanstack/react-query";
import { getDiscoverGroup } from "../api/getDiscoverGroup";

export const useDiscoverGroup = (isEnabled: boolean = true, name?: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["discover-group", name],
        queryFn: () => getDiscoverGroup(name),
        select: (data) => data.data,
        enabled: isEnabled
    });

    return {
        data,
        isLoading,
        error
    };
};
