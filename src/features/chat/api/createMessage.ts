import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const messageResponseSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  senderId: z.string(),
  content: z.string(),
  type: z.string(),
  createdAt: z.string(),
});

export type MessageResponseValues = z.infer<typeof messageResponseSchema>;

export const createMessage = async (
  data: FormData
): Promise<BaseResponse<MessageResponseValues>> =>
  instanceApiToken.post("/chat/rooms/messages", data).then((res) => res.data);
