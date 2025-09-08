import z from "zod";
import { instanceApiToken } from "../../../shared/utils/axios";
import type { BaseResponse } from "../../../shared/types/response";

export const profileResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  photo_url: z.string(),
  groups: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      room: z.object({
        RoomMember: z.array(z.object({ joinedAt: z.string() })),
      }),
      photo_url: z.string(),
    })
  ),
});

export type ProfileResponseValues = z.infer<typeof profileResponseSchema>;

export const getProfile = async (
  id: string
): Promise<BaseResponse<ProfileResponseValues>> =>
  instanceApiToken.get(`/user/profile/${id}`).then((res) => res.data);
