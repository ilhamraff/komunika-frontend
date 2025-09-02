import z from "zod";

export const searchSchema = z.object({
  query: z.string(),
});

export type SearchValues = z.infer<typeof searchSchema>;
