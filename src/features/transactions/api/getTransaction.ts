import z from "zod";
import instanceApi from "../../../shared/utils/axios";
import type { BaseResponse } from "../../../shared/types/response";

export const transactionSchema = z.object({
  createdAt: z.string(),
  price: z.number(),
  type: z.string(),
  group: z.object({
    name: z.string(),
    room: z.object({ _count: z.object({ RoomMember: z.number() }) }),
    photo_url: z.string(),
  }),
});

export type TransactionValues = z.infer<typeof transactionSchema>;

export const getTransaction = async (
  id: string
): Promise<BaseResponse<TransactionValues>> =>
  instanceApi.get(`/transaction/${id}`).then((res) => res.data);
