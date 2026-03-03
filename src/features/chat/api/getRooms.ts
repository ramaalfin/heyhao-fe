import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import { RoomResponseValues } from "../schema/getRoomSchema";

export const getRooms = async () => {
  return instanceApiWithToken.get<BaseResponse<RoomResponseValues[]>>(
    "/chat/rooms",
  );
};
