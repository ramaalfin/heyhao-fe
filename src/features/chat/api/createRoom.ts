import { instanceApiWithToken } from "../../../shared/utils/axios";

export const createRoom = async (user_id: string) =>
  instanceApiWithToken.post("/chat/rooms", { user_id }).then((res) => res.data);
