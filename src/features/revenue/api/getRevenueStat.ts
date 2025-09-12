import z from "zod";
import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const revenueResponseSchema = z.object({
  balance: z.number(),
  totalVipGroups: z.number(),
  totalVipMembers: z.number(),
  totalRevenue: z.number(),
  latestMembersVip: z.array(
    z.object({
      id: z.string(),
      ownerId: z.string(),
      userId: z.string(),
      groupId: z.string(),
      price: z.number(),
      type: z.string(),
      createdAt: z.string(),
      User: z.object({ name: z.string(), photo_url: z.string() }),
      group: z.object({ name: z.string(), photo_url: z.string() }),
    })
  ),
  transactionsPerMonths: z.record(z.string(), z.number()),
});

export type RevenueResponseValues = z.infer<typeof revenueResponseSchema>;

export const getRevenueStat = async (): Promise<
  BaseResponse<RevenueResponseValues>
> => instanceApiToken.get("/revenue").then((res) => res.data);
