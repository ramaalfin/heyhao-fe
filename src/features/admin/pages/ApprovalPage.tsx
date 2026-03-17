import { useParams } from "react-router";
import { useGetAdminPayoutById } from "../hooks/useGetAdminPayoutById";
import { useUpdateAdminPayout } from "../hooks/useUpdateAdminPayout";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";

interface ApprovalFormValues {
  proof: FileList;
}

export default function ApprovalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetAdminPayoutById(id as string);
  const { mutate, isPending } = useUpdateAdminPayout();
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<ApprovalFormValues>();

  const onSubmit = (values: ApprovalFormValues) => {
    if (!values.proof || values.proof.length === 0) {
      toast.error("Please upload a proof of transfer");
      return;
    }

    const formData = new FormData();
    formData.append("proof", values.proof[0]);

    mutate(
      { id: id as string, formData },
      {
        onSuccess: () => {
          toast.success("Payout updated successfully!");
          navigate("/admin/payouts");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to update payout");
        },
      },
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="font-semibold text-lg">Loading Details...</p>
      </div>
    );
  }

  return (
    <main className="relative flex flex-1">
      <div className="flex flex-col flex-1">
        <div className="relative flex w-full h-[93px] shrink-0 border-b border-heyhao-border bg-white p-[30px] gap-[10px]">
          <h1 className="font-bold text-2xl leading-[30px]">Approve Payout</h1>
        </div>
        <div className="flex flex-1 overflow-y-scroll hide-scrollbar">
          <div className="flex flex-col w-full max-w-[836px] mx-[30px] py-[30px] gap-8">
            {/* Payout Details Card */}
            <div className="flex flex-col rounded-3xl border border-heyhao-border bg-white p-6 gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-heyhao-secondary font-medium">Bank Details</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-heyhao-secondary">Bank Name</p>
                    <p className="text-lg font-bold">{data?.bank_name}</p>
                  </div>
                  <div className="flex flex-col ml-12">
                    <p className="text-sm font-semibold text-heyhao-secondary">Account Number</p>
                    <p className="text-lg font-bold">{data?.bank_account_number}</p>
                  </div>
                  <div className="flex flex-col ml-12">
                    <p className="text-sm font-semibold text-heyhao-secondary">Account Name</p>
                    <p className="text-lg font-bold">{data?.bank_account_name}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-heyhao-border pt-6">
                <p className="text-heyhao-secondary font-medium mb-1">Total Payout</p>
                <p className="text-3xl font-bold text-heyhao-coral">
                  Rp{data?.amount.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col rounded-3xl border border-heyhao-border bg-white p-6 gap-6">
              <h2 className="text-xl font-bold">Transfer Proof</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <label htmlFor="proof" className="font-semibold text-heyhao-secondary">
                    Upload Transfer Receipt
                  </label>

                  <div className="relative w-full h-[300px] border-2 border-dashed border-heyhao-border rounded-3xl overflow-hidden flex items-center justify-center bg-gray-50 group hover:border-heyhao-blue transition-colors duration-300">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Proof Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 cursor-pointer">
                        <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-heyhao-blue/10 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8 text-heyhao-blue"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                        <p className="font-semibold text-heyhao-secondary">Click to upload image</p>
                      </div>
                    )}
                    <input
                      id="proof"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      {...register("proof", {
                        onChange: handleFileChange,
                      })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-heyhao-blue text-white font-bold py-4 px-8 rounded-full transition-all hover:bg-heyhao-blue/90 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-[0_10px_20px_0_#165DFF40]"
                >
                  {isPending ? "Confirming..." : "Confirm Withdraw"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
