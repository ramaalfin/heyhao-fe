import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import { PayoutValues } from "../utils/schema";

export const getPayouts = async (): Promise<BaseResponse<PayoutValues>> => {
    const response = await instanceApiWithToken.get<BaseResponse<PayoutValues>>("/payouts");
    return response.data;
}

