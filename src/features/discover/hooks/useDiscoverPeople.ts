import { useQuery } from "@tanstack/react-query";
import { getDiscoverPeople } from "../api/getDiscoverPeople";

export const useDiscoverPeople = (isEnabled: boolean = true, name?: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["discover-people", name],
        queryFn: () => getDiscoverPeople(name),
        select: (data) => data.data,
        enabled: isEnabled
    });

    return {
        data,
        isLoading,
        error,
        isError
    };
};
