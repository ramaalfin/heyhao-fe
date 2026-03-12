import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import { CreateGroupFormValues, GroupResponse } from "../schema/createGroupSchema";

export const updatePaidGroup = async (id: string, payload: CreateGroupFormValues) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", payload.name);
  formData.append("about", payload.about);
  
  if (payload.photo instanceof File) {
    formData.append("photo", payload.photo);
  }
  
  formData.append("price", (payload.price || 0).toString());
  
  if (payload.benefit) {
    payload.benefit.forEach((b) => formData.append("benefit", b));
  }
  
  if (payload.assets) {
    payload.assets.forEach((a) => {
      if (a instanceof File) {
        formData.append("assets", a);
      }
    });
  }

  return instanceApiWithToken.put<BaseResponse<GroupResponse>>(`/groups/paid/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateFreeGroup = async (id: string, payload: CreateGroupFormValues) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", payload.name);
  formData.append("about", payload.about);
  
  if (payload.photo instanceof File) {
    formData.append("photo", payload.photo);
  }

  return instanceApiWithToken.put<BaseResponse<GroupResponse>>(`/groups/free/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
