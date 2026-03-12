import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import { CreateGroupFormValues, GroupResponse } from "../schema/createGroupSchema";

export const createPaidGroup = async (payload: CreateGroupFormValues) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("about", payload.about);
  formData.append("photo", payload.photo);
  formData.append("price", (payload.price || 0).toString());
  
  if (payload.benefit) {
    payload.benefit.forEach((b) => formData.append("benefit", b));
  }
  
  if (payload.assets) {
    payload.assets.forEach((a) => formData.append("assets", a));
  }

  return instanceApiWithToken.post<BaseResponse<GroupResponse>>("/groups/paid", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createFreeGroup = async (payload: CreateGroupFormValues) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("about", payload.about);
  formData.append("photo", payload.photo);

  return instanceApiWithToken.post<BaseResponse<GroupResponse>>("/groups/free", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
