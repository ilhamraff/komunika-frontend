import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const withdrawResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  bankName: z.string(),
  bankAccountNumber: z.string(),
  bankAccountName: z.string(),
  status: z.string(),
  proof: z.null(),
  createdAt: z.string(),
});

export type WithdrawResponseValues = z.infer<typeof withdrawResponseSchema>;

export const getWithdraw = async (): Promise<
  BaseResponse<WithdrawResponseValues[]>
> => instanceApiToken.get("/payouts").then((res) => res.data);
