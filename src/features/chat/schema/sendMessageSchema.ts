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

export type SendMessageResponseValues = z.infer<
  typeof sendMessageResponseSchema
>;

export interface SendMessagePayload {
  message: string;
  room_id: string;
  attach?: File | null;
}
