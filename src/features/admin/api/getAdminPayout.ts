import { instanceApiWithTokenAdmin } from "../../../shared/utils/axios";
import { getPayoutSchema } from "../utils/schema";

export const getAdminPayout = async () => {
  const response = await instanceApiWithTokenAdmin.get("/transactions/admin/payouts");
  return getPayoutSchema.parse(response.data.data);
};
