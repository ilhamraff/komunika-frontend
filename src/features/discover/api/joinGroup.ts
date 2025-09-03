import { instanceApiToken } from "../../../shared/utils/axios";
import type { JoinGroupValues } from "../utils/Schema";

export const joinGroup = (data: JoinGroupValues) =>
  instanceApiToken.post("/groups/join", data).then((res) => res.data);
