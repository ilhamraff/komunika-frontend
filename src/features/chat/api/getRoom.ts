import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const roomGroupSchema = z.object({
  name: z.string(),
  type: z.string(),
  GroupAsset: z.array(
    z.object({ id: z.string(), groupId: z.string(), filename: z.string() })
  ),
  benefit: z.array(z.string()),
  room: z.object({ _count: z.object({ RoomMember: z.number() }) }),
  photo_url: z.string(),
});

export const messageSchema = z.object({
  content: z.string(),
  type: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    photo_url: z.string(),
  }),
  createdAt: z.string(),
  content_url: z.string(),
});

export const roomResponseSchema = z.object({
  id: z.string(),
  isGroup: z.boolean(),
  RoomMessage: z.array(messageSchema),
  Group: roomGroupSchema,
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
export type MessageValues = z.infer<typeof messageSchema>;

export const getRoom = async (
  id: string
): Promise<BaseResponse<RoomResponseValues>> =>
  instanceApiToken.get(`/chat/rooms/${id}`).then((res) => res.data);
