import { instanceApiToken } from "../../../shared/utils/axios";

export const updateGroup = async (data: FormData, type: string, id: string) =>
  instanceApiToken
    .put(`/groups/${type}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
