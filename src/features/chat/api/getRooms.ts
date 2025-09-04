import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const roomsResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  isGroup: z.boolean(),
  createdBy: z.string(),
  createdAt: z.string(),
  RoomMessage: z.array(
    z.object({
      content: z.string(),
      type: z.string(),
      user: z.object({ name: z.string(), photo_url: z.string() }),
      createdAt: z.string(),
      content_url: z.string(),
    })
  ),
  RoomMember: z.array(
    z.object({
      user: z.object({
        id: z.string(),
        name: z.string(),
        photo_url: z.string(),
      }),
    })
  ),
  Group: z.object({ name: z.string(), photo_url: z.string() }).nullable(),
});

export type RoomsResponseValues = z.infer<typeof roomsResponseSchema>;

export const getRooms = (): Promise<BaseResponse<RoomsResponseValues[]>> =>
  instanceApiToken.get("/chat/rooms").then((res) => res.data);
