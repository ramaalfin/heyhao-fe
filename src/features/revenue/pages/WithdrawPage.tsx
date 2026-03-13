import { Link, useNavigate } from "react-router";
import { useGetBalance } from "../hooks/useGetBalance";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { SignUpResponse } from "../../auth/api/signUp";
import { useCreatePayouts } from "../hooks/useCreatePayouts";
import { useForm, Controller } from "react-hook-form";
import { withdrawSchema, WithdrawValues } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { data: balance } = useGetBalance();
  const { mutateAsync: createPayouts, isPending: isPendingCreatePayouts } = useCreatePayouts();

  const { control, handleSubmit, watch, formState: { errors } } = useForm<WithdrawValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "",
      bank_name: "",
      bank_account_number: "",
      bank_account_name: "",
    },
  });

  const amount = watch("amount");

  const auth = secureLocalStorage.getItem(AUTH_KEY) as SignUpResponse;

  const onSubmit = async (data: WithdrawValues) => {
    try {
      if (Number(data.amount) > (balance || 0)) {
        toast.error("Balance tidak cukup");
        return;
      }
      await createPayouts({
        amount: Number(data.amount),
        bank_name: data.bank_name,
        bank_account_number: Number(data.bank_account_number),
        bank_account_name: data.bank_account_name,
      });
      toast.success("Withdraw request submitted successfully");
      navigate("/home/revenue/payouts");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit withdraw request");
    }
  };

  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <main id="Main-Content-Container" className="relative flex flex-1">
        <div className="flex flex-col flex-1">
          <div
            id="Header"
            className="relative flex flex-col w-full shrink-0 border-b border-heyhao-border bg-white p-[30px] gap-3"
          >
            <h1 className="font-bold text-2xl leading-[30px]">
              Withdraw Money
            </h1>
            <nav>
              <ol className="flex items-center gap-1 leading-5 text-heyhao-secondary">
                <li>
                  <Link to="/home/revenue" className="hover:underline">
                    My Revenue Stat
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <span className="font-medium leading-5 text-heyhao-blue">
                    Request Withdraw
                  </span>
                </li>
              </ol>
            </nav>
          </div>
          <div id="Content" className="flex flex-1 overflow-y-scroll">
            <div className="flex flex-1 min-h-screen">
              <div className="flex w-[636px] shrink-0 bg-white">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col flex-1 gap-[30px] p-[30px] bg-white"
                >
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Total Amount
                    </p>
                    <div className="relative group">
                      <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="number"
                            autoComplete="off"
                            {...field}
                            id=""
                            placeholder=""
                            className="relative appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-[110px] gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                          />
                        )}
                      />
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/dollar-circle-grey.svg"
                          className="hidden size-6 shrink-0 group-has-placeholder-shown:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/dollar-circle-black.svg"
                          className="flex size-6 shrink-0 group-has-placeholder-shown:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                        <span className="font-semibold group-has-placeholder-shown:text-heyhao-secondary text-heyhao-black">
                          Rp
                        </span>
                      </div>
                    </div>
                    {errors.amount && (
                      <span className="text-heyhao-coral text-sm">
                        {errors.amount.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Select Bank
                    </p>
                    <div className="relative group">
                      <Controller
                        name="bank_name"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="relative appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                          >
                            <option value="">Select Bank</option>
                            <option value="BCA">BCA</option>
                            <option value="MANDIRI">Bank Mandiri</option>
                            <option value="BNI">Bank BNI</option>
                          </select>
                        )}
                      />
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/bank-grey.svg"
                          className="hidden size-6 shrink-0 group-has-placeholder-shown:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/bank-black.svg"
                          className="flex size-6 shrink-0 group-has-placeholder-shown:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      </div>
                    </div>
                    {errors.bank_name && (
                      <span className="text-heyhao-coral text-sm">
                        {errors.bank_name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Bank Account Number
                    </p>
                    <div className="relative group">
                      <Controller
                        name="bank_account_number"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="number"
                            autoComplete="off"
                            {...field}
                            id=""
                            placeholder=""
                            className="relative appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                          />
                        )}
                      />
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/card-grey.svg"
                          className="hidden size-6 shrink-0 group-has-placeholder-shown:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/card-black.svg"
                          className="flex size-6 shrink-0 group-has-placeholder-shown:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      </div>
                    </div>
                    {errors.bank_account_number && (
                      <span className="text-heyhao-coral text-sm">
                        {errors.bank_account_number.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-sm text-heyhao-secondary">
                      Bank Account Name
                    </p>
                    <div className="relative group">
                      <Controller
                        name="bank_account_name"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            autoComplete="off"
                            {...field}
                            id=""
                            placeholder=""
                            className="relative appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"
                          />
                        )}
                      />
                      <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                        <img
                          src="/assets/images/icons/user-square-grey.svg"
                          className="hidden size-6 shrink-0 group-has-placeholder-shown:flex"
                          alt="icon"
                        />
                        <img
                          src="/assets/images/icons/user-square-black.svg"
                          className="flex size-6 shrink-0 group-has-placeholder-shown:hidden"
                          alt="icon"
                        />
                        <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                      </div>
                    </div>
                    {errors.bank_account_name && (
                      <span className="text-heyhao-coral text-sm">
                        {errors.bank_account_name.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isPendingCreatePayouts}
                    className="h-[62px] rounded-full py-4 px-6 bg-heyhao-blue font-bold leading-5 text-white w-fit mb-[30px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPendingCreatePayouts ? "Requesting..." : "Request for Withdraw"}
                  </button>
                  <span className="spacer flex h-[30px] shrink-0"></span>
                </form>
              </div>
              <div className="flex w-[560px] shrink-0">
                <div className="flex flex-1 flex-col gap-[30px] p-[30px]">
                  <div className="relative flex flex-col w-full h-[282px] shrink-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src="/assets/images/backgrounds/ornament-withdraw.png"
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="relative flex flex-col p-6 flex-1">
                      <button className="flex items-center gap-2 rounded-full p-2 pr-4 w-fit bg-heyhao-purple">
                        <img
                          src="/assets/images/icons/idr-flag.svg"
                          className="flex size-8 shrink-0"
                          alt="icon"
                        />
                        <p className="font-bold text-white">IDR</p>
                      </button>
                      <div className="flex flex-col gap-2 mt-[21px]">
                        <p className="font-medium leading-5 text-[#785D93]">
                          Total Balance
                        </p>
                        <p className="font-bold text-[42px] leading-[52.5px]">
                          Rp{balance?.toLocaleString("id-ID") || "0"}
                        </p>
                      </div>
                      <hr className="border-white/21 mt-10 mb-6" />
                      <p className="font-medium leading-5 text-[#876A9E] capitalize">
                        {auth?.name || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 p-6 rounded-3xl w-full bg-white">
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold leading-5">
                        Withdraw Terms & Conditions
                      </p>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Bank account details must be accurate and valid.
                        </p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Processing takes up to 3 business days.
                        </p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Only official platform methods are accepted.
                        </p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Fake withdrawal requests will be rejected.
                        </p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/checklist-green-fill.svg"
                          className="flex size-6 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold leading-5">
                          Contact support if you encounter issues.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-full py-4 px-6 justify-center bg-heyhao-blue">
                      <img
                        src="/assets/images/icons/messages-2-round-white-fill.svg"
                        className="flex size-6 shrink-0"
                        alt="icon"
                      />
                      <p className="font-medium leading-5 text-white">
                        Customer Service
                      </p>
                    </div>
                  </div>
                  <span className="spacer flex h-[30px] shrink-0"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
