import { z } from "zod";

export const sendMessageResponseSchema = z.object({
  id: z.string(),
  room_id: z.string(),
  sender_id: z.string(),
  content: z.string(),
  type: z.string(),
  created_at: z.string(),
  content_url: z.string().nullable().optional(),
});

// Only the fields that exist as actual form inputs
export const sendMessageFormSchema = z.object({
  message: z.string(),
});

export type SendMessageFormValues = z.infer<typeof sendMessageFormSchema>;
export type SendMessageResponseValues = z.infer<typeof sendMessageResponseSchema>;

// Full payload sent to the API (room_id is injected from props, not from form)
// ✅ fixed: attach is File | null (not File | undefined) to stay consistent
export interface SendMessagePayload {
  message: string;
  room_id: string;
  attach?: File | null;
}