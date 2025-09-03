import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const detailGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  about: z.string(),
  type: z.string(),
  GroupAsset: z.array(z.object({ filename: z.string(), id: z.string() })),
  room: z.object({
    RoomMember: z.array(
      z.object({
        user: z.object({ name: z.string(), photo_url: z.string() }),
        joinedAt: z.string(),
      })
    ),
    _count: z.object({ RoomMember: z.number() }),
  }),
  photo_url: z.string(),
  benefit: z.array(z.string()).nonempty(),
  price: z.number(),
});

export type DetailGroupValues = z.infer<typeof detailGroupSchema>;

export const getDetailGroup = async (
  id: string
): Promise<BaseResponse<DetailGroupValues>> =>
  instanceApiToken.get(`/groups/${id}`).then((res) => res.data);
