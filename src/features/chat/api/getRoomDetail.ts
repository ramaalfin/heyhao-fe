import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import { RoomDetailResponseValues } from "../schema/getRoomDetailSchema";

export const getRoomDetail = async (roomId: string) => {
  return instanceApiWithToken.get<BaseResponse<RoomDetailResponseValues>>(
    `/chat/rooms/${roomId}`,
  );
};
