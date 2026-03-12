import { z } from "zod";

export interface GroupResponse {
  id: string;
  name: string;
  photo: string;
  type: string;
  about: string;
  benefit: any[];
  price: number;
  room_id: string;
  created_at: string;
  photo_url: string;
}

export const createGroupSchema = z.object({
  type: z.enum(["FREE", "PAID"]),
  name: z.string().min(1, "Group name is required"),
  about: z.string().min(1, "About group is required"),
  photo: z.any().refine((file) => file instanceof File, "Photo is required"),
  price: z.coerce.number().optional(),
  benefit: z.array(z.string()).optional(),
  assets: z.array(z.any()).optional(),
}).superRefine((data, ctx) => {
  if (data.type === "PAID") {
    if (!data.price || data.price < 1000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Price must be at least 1000",
        path: ["price"],
      });
    }
    if (!data.benefit || data.benefit.length === 0 || data.benefit.some(b => !b)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one benefit is required",
        path: ["benefit"],
      });
    }
    if (!data.assets || data.assets.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one asset is required",
        path: ["assets"],
      });
    }
  }
});

export type CreateGroupFormValues = z.infer<typeof createGroupSchema>;
