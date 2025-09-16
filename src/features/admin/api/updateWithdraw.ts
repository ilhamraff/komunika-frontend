import { instanceApiAdminToken } from "../../../shared/utils/axios";

export const updateWithdraw = async (id: string, data: FormData) =>
  instanceApiAdminToken
    .put(`/admin/payouts/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
