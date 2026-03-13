import { z } from "zod";

export const withdrawSchema = z.object({
    amount: z.string().min(1, "Amount must be greater than 0"),
    bank_name: z.string().min(1, "Bank name is required"),
    bank_account_number: z.string().min(1, "Account number is required"),
    bank_account_name: z.string().min(1, "Account name is required"),
});

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
        created_at: z.string()
    })
)

export type WithdrawValues = z.infer<typeof withdrawSchema>;
export type PayoutValues = z.infer<typeof getPayoutSchema>;

export interface PayoutPayload {
    amount: number;
    bank_name: string;
    bank_account_number: number;
    bank_account_name: string;
}