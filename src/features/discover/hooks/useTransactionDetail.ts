import { useQuery } from "@tanstack/react-query";
import { getTransactionDetail } from "../api/getTransactionDetail";

export const useTransactionDetail = (id: string, isEnabled: boolean = true) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["transaction-detail", id],
        queryFn: () => getTransactionDetail(id),
        select: (data) => data.data,
        enabled: isEnabled && !!id
    });

    return {
        data,
        isLoading,
        error
    };
};
