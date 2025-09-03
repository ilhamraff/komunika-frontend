import z from "zod";

export const searchSchema = z.object({
  query: z.string(),
});

export const joinGroupSchema = z.object({
  groupId: z.string(),
});

export type SearchValues = z.infer<typeof searchSchema>;
export type JoinGroupValues = z.infer<typeof joinGroupSchema>;
