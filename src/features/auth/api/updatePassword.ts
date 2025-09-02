import instanceApi from "../../../shared/utils/axios";
import type { UpdatePasswordValues } from "../utils/schema";

export const updatePassword = async (
  token: string,
  data: UpdatePasswordValues
) =>
  instanceApi
    .put(`/auth/reset-password/${token}`, data)
    .then((res) => res.data);
