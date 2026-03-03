import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import {
  SendMessagePayload,
  SendMessageResponseValues,
} from "../schema/sendMessageSchema";

export const sendMessage = async (payload: SendMessagePayload) => {
  const formData = new FormData();
  formData.append("message", payload.message);
  formData.append("room_id", payload.room_id);
  if (payload.attach) {
    formData.append("attach", payload.attach);
  }

  return instanceApiWithToken.post<BaseResponse<SendMessageResponseValues>>(
    "/chat/rooms/messages",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};
