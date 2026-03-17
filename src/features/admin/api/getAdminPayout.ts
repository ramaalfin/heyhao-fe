import { instanceApiWithTokenAdmin } from "../../../shared/utils/axios";
import z from "zod";

export const getPayoutSchema = z.array(
  z.object({
    id: z.string(),
    user_id: z.string(),
    amount: z.number(),
    bank_name: z.string(),
    bank_account_number: z.string(),
    bank_account_name: z.string(),
    status: z.string(),
    proof: z.null(),
    created_at: z.string(),
  }),
);

export type AdminPayoutValues = z.infer<typeof getPayoutSchema>;

export const getAdminPayout = async () => {
  const response = await instanceApiWithTokenAdmin.get("/admin/payouts");
  return getPayoutSchema.parse(response.data.data);
};
