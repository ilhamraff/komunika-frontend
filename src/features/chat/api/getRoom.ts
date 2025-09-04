import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const roomResponseSchema = z.object({
  id: z.string(),
  isGroup: z.boolean(),
  RoomMessage: z.array(
    z.object({
      content: z.string(),
      type: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        photo_url: z.string(),
      }),
      createdAt: z.string(),
      content_url: z.string(),
    })
  ),
  Group: z.object({ name: z.string(), photo_url: z.string() }),
  RoomMember: z.array(
    z.object({
      user: z.object({
        id: z.string(),
        name: z.string(),
        photo_url: z.string(),
      }),
    })
  ),
});

export type RoomResponseValues = z.infer<typeof roomResponseSchema>;

export const getRoom = async (
  id: string
): Promise<BaseResponse<RoomResponseValues>> =>
  instanceApiToken.get(`/chat/rooms/${id}`).then((res) => res.data);
