import z from "zod";
import { instanceApiToken } from "../../../shared/utils/axios";
import type { JoinGroupValues } from "../utils/Schema";
import type { BaseResponse } from "../../../shared/types/response";

export const joinPaidGroupSchema = z.object({
  token: z.string(),
  redirect_url: z.string(),
});

export type JoidPaidGroupValues = z.infer<typeof joinPaidGroupSchema>;

export const joinPaidGroup = (
  data: JoinGroupValues
): Promise<BaseResponse<JoidPaidGroupValues>> =>
  instanceApiToken.post("/transaction", data).then((res) => res.data);
