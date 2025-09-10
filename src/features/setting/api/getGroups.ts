import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const groupsResponseSchema = z.object({
  lists: z.array(
    z.object({
      id: z.string(),
      photo_url: z.string(),
      name: z.string(),
      type: z.string(),
      totalMembers: z.number(),
    })
  ),
  paidGroups: z.number(),
  freeGroups: z.number(),
  totalMembers: z.number(),
});

export type GroupsResponseValues = z.infer<typeof groupsResponseSchema>;

export const getGroups = async (): Promise<
  BaseResponse<GroupsResponseValues>
> => instanceApiToken.get("/own-groups").then((res) => res.data);
