import { instanceApiToken } from "../../../shared/utils/axios";

export const createRoom = async (userId: string) =>
  instanceApiToken.post("/chat/rooms", { userId }).then((res) => res.data);
