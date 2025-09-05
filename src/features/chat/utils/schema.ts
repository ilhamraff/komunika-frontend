import z from "zod";

export const messageInputSchema = z.object({
  message: z.string(),
});

export type MessageInputValues = z.infer<typeof messageInputSchema>;
