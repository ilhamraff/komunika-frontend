import z from "zod";
import { instanceApiToken } from "../../../shared/utils/axios";

export const withdrawSchema = z.object({
  amount: z
    .number()
    .min(1, "Minimum withdraw is 1 rupiah")
    .max(10000000, "Amount exceeds maximum withdraw limit"),
  bankName: z
    .string()
    .min(1, "Bank name is required")
    .max(100, "Bank name too long"),
  bankAccountNumber: z
    .number()
    .min(5, "Bank account number must be at least 5 digits")
    .max(30, "Bank account number too long"),
  bankAccountName: z
    .string()
    .min(1, "Bank account name must be at least 1 characters")
    .max(100, "Bank account name too long"),
});

export type WithdrawValues = z.infer<typeof withdrawSchema>;

export const createWithdraw = async (data: WithdrawValues) =>
  instanceApiToken.post("/payouts", data).then((res) => res.data);
