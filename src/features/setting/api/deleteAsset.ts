import { instanceApiToken } from "../../../shared/utils/axios";

export const deleteAsset = async (id: string) =>
  instanceApiToken.delete(`/groups/asset/${id}`).then((res) => res.data);
