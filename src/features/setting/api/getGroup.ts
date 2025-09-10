import z from "zod";
import { instanceApiToken } from "../../../shared/utils/axios";
import type { BaseResponse } from "../../../shared/types/response";

export const groupResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  about: z.string(),
  type: z.string(),
  GroupAsset: z.array(
    z.object({ filename: z.string(), id: z.string(), file_url: z.string() })
  ),
  price: z.number(),
  benefit: z.array(z.string()),
  room: z.object({
    RoomMember: z.array(
      z.object({
        user: z.object({ name: z.string(), photo_url: z.string() }),
        joinedAt: z.string(),
        role: z.object({ role: z.string() }),
      })
    ),
    _count: z.object({ RoomMember: z.number() }),
  }),
  photo_url: z.string(),
});

export type GroupResponseValues = z.infer<typeof groupResponseSchema>;

export const getGroup = async (
  id: string
): Promise<BaseResponse<GroupResponseValues>> =>
  instanceApiToken.get(`/my-groups/${id}`).then((res) => res.data);
