import instanceApi from "../../../shared/utils/axios";
import type { ForgotPasswordValues } from "../utils/schema";

export const forgotPassword = async (data: ForgotPasswordValues) =>
  instanceApi.post("/auth/reset-password", data).then((res) => res.data);
