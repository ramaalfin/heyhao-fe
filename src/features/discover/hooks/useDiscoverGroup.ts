import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse } from "../types/response";
import { getDiscoverGroup, GetDiscoverGroupResponse } from "../api/getDiscoverGroup";

export const useDiscoverGroup = () => {
    const { mutateAsync, isPending, error } = useMutation<BaseResponse<GetDiscoverGroupResponse>, AxiosError<BaseResponse<GetDiscoverGroupResponse>>, string | null | undefined>({
        mutationFn: (query) => getDiscoverGroup(query ?? undefined),
    });

    return {
        mutateAsync,
        isPending,
        error
    };
};
