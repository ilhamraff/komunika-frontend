import type { BaseResponse } from "../../../shared/types/response";
import instanceApi from "../../../shared/utils/axios";
import type { SignInValues } from "../utils/schema";
import type { SignUpResponse } from "./signUp";

export const signIn = async (
  data: SignInValues
): Promise<BaseResponse<SignUpResponse>> =>
  instanceApi.post("/auth/sign-in", data).then((res) => res.data);
