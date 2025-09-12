import type { BaseResponse } from "../../../shared/types/response";
import { instanceApiToken } from "../../../shared/utils/axios";

export const getBalance = async (): Promise<BaseResponse<number>> =>
  instanceApiToken.get("/balance").then((res) => res.data);
