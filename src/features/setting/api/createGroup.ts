import { instanceApiToken } from "../../../shared/utils/axios";

export const createGroup = async (data: FormData, type: string) =>
  instanceApiToken
    .post(`/groups/${type}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
