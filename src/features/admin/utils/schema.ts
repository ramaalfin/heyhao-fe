import { z } from "zod";

export const payoutSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  amount: z.number(),
  bank_name: z.string(),
  bank_account_number: z.string(),
  bank_account_name: z.string(),
  status: z.string(),
  proof: z.string().nullable(),
  created_at: z.string(),
});

export const getPayoutSchema = z.array(payoutSchema);

export const approvalSchema = z.object({
  status: z.enum(["SUCCESS", "FAILED", "PENDING"]),
  proof: z.string().optional(),
});

export type ApprovalSchema = z.infer<typeof approvalSchema>;
export type AdminPayoutValues = z.infer<typeof getPayoutSchema>;
export type AdminPayoutDetailValues = z.infer<typeof payoutSchema>;
