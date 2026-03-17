import { instanceApiWithTokenAdmin } from "../../../shared/utils/axios";
import { payoutSchema } from "../utils/schema";

export const getAdminPayoutById = async (id: string) => {
  const response = await instanceApiWithTokenAdmin.get(`/admin/payouts/${id}`);
  return payoutSchema.parse(response.data.data);
};

export const updateAdminPayout = async (id: string, formData: FormData) => {
  const response = await instanceApiWithTokenAdmin.put(
    `/admin/payouts/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
