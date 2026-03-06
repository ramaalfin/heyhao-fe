import { z } from "zod";

export const getRoomDetailSchema = z.object({
  id: z.string(),
  is_group: z.boolean(),
  messages: z.array(
    z.object({
      content: z.string(),
      type: z.string(),
      user: z
        .object({
          id: z.string(),
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
        created_at: z.string(),
        photo_url: z.string().nullable().optional(),
      }),
      role: z
        .object({
          role: z.string(),
        })
        .optional()
        .nullable(),
      joined_at: z.string(),
    }),
  ),
  group: z
    .object({
      name: z.string(),
      about: z.string(),
      type: z.string(),
      assets: z.array(
        z.object({
          id: z.string(),
          group_id: z.string(),
          filename: z.string(),
          file_url: z.string(),
        }),
      ),
      benefit: z.array(z.string()),
      room: z.object({
        _count: z.object({
          members: z.number(),
        }),
      }),
      photo_url: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export type RoomDetailResponseValues = z.infer<typeof getRoomDetailSchema>;
