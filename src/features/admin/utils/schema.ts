import z from "zod";

export const approvalSchema = z.object({
  proof: z
    .any()
    .refine((file: File) => file?.name, { message: "Proof is required" }),
});

export type ApprovalValues = z.infer<typeof approvalSchema>;
