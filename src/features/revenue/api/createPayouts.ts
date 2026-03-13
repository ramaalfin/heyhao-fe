import { instanceApiWithToken } from "../../../shared/utils/axios";
import { PayoutPayload } from "../utils/schema";

export const createPayouts = async (data: PayoutPayload) => {
    const response = await instanceApiWithToken.post("/payouts", data);
    return response.data;
};
