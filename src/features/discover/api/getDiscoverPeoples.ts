import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const discoverPeoplesSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    photo_url: z.string(),
    createdAt: z.string(),
  })
);

export type DiscoverPeoplesValues = z.infer<typeof discoverPeoplesSchema>;

export const getDiscoverPeoples = (
  query = ""
): Promise<BaseResponse<DiscoverPeoplesValues>> =>
  instanceApiToken.get(`/peoples?name=${query}`).then((res) => res.data);
