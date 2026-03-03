import { z } from "zod";

export const schema = z.object({
  id: z.string(),
  name: z.string(),
  is_group: z.boolean(),
  created_by: z.string(),
  created_at: z.string(),
  messages: z.array(
    z.object({
      content: z.string(),
      type: z.string(),
      user: z
        .object({
          name: z.string(),
          photo_url: z.string().nullable().optional(),
        })
        .nullable()
        .optional(),
      created_at: z.string(),
      content_url: z.string().nullable().optional(),
    }),
  ),
  members: z.array(
    z.object({
      user: z.object({
        id: z.string(),
        name: z.string(),
        photo_url: z.string().nullable().optional(),
      }),
    }),
  ),
  group: z
    .object({ name: z.string(), photo_url: z.string().nullable().optional() })
    .nullable()
    .optional(),
});

export type RoomResponseValues = z.infer<typeof schema>;
