import z from "zod";

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Group name must be at least 3 characters" }),
  type: z.enum(["FREE", "PAID"], {
    message: "Please select a valid group type",
  }),
  about: z.string().min(6, { message: "About must be at least 6 characters" }),
  price: z.string().min(1, { message: "Please input price" }).optional(),
  benefits: z
    .array(
      z.object({
        benefit: z
          .string()
          .min(3, { message: "Benefit must be at least 3 characters" }),
      })
    )
    .optional(),
  thumbnail: z.any().refine((file: File) => file?.type.startsWith("image/"), {
    message: "Thumbnail must be an image file",
  }),
  assets: z
    .array(
      z.object({
        asset: z.any().refine((file: File) => file?.type.startsWith("image/"), {
          message: "Asset must be an image file",
        }),
      })
    )
    .optional(),
});

export type CreateGroupValues = z.infer<typeof createGroupSchema>;
