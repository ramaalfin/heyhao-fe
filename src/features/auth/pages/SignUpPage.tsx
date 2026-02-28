import { useForm } from "react-hook-form";

import CarouselImage from "../components/CarouselImage";
import { signUpSchema, SignUpValues } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "../hooks/useSignUp";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { AxiosError } from "axios";
import { toast } from "react-toastify"
import { Link } from "react-router";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const photo = watch("photo");

  const { mutateAsync, isPending } = useSignUp();

  const photoPreview =
    photo instanceof File
      ? URL.createObjectURL(photo)
      : "/assets/images/photos/default.png";

  const onSubmit = async (data: SignUpValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("photo", data.photo);

      const response = await mutateAsync(formData);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }

      secureLocalStorage.setItem(AUTH_KEY, response.data);
      window.location.replace("/home/chat");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error?.response?.data?.message ?? "An error occured");
      }

      const err = error as Error;

      toast.error(err?.message ?? "An error occured");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EBEDF2]">
      <CarouselImage />

      <main
        id="ContainerInputs"
        className="flex items-center justify-end flex-1 pr-[calc(((100%-1280px)/2)+75px)] py-15"
      >
        <section
          id="BackgroundInputs"
          className="fixed bg-white rounded-l-3xl top-0 right-0 bottom-0 left-171.25"
        ></section>
        <div className="flex w-108.75 h-fit shrink-0 flex-col gap-10 z-20 relative">
          <section id="CompanyLogo">
            <img
              src="assets/images/logos/heyhao.svg"
              alt="icon"
              className="w-44.5 h-9.5 shrink-0 mx-auto"
            />
          </section>
          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-7.5">
              <header className="flex flex-col gap-3">
                <h1 className="font-semibold text-6 leading-7.5 text-center">
                  Hey🙌🏻, Welcome Aboard!
                </h1>
                <p className="font-medium leading-5 text-center text-heyhao-secondary">
                  Create your account to continue!
                </p>
              </header>
              <div className="">
                <section
                  id="Avatar"
                  className="flex items-center gap-3 justify-center"
                >
                  <div className="flex items-center justify-center rounded-full overflow-hidden size-25 shrink-0">
                    <img
                      src={photoPreview}
                      alt="image"
                      className="object-cover size-full"
                    />
                  </div>
                  <input
                    {...register("photo")}
                    id="file-input"
                    name="test"
                    type="file"
                    className="absolute opacity-0"
                    onChange={(e) => {
                      if (e.target.files) {
                        setValue("photo", e.target.files[0]);
                      }
                    }}
                  />
                  <button
                    type="button"
                    id="add-photo"
                    className="flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-heyhao-black"
                  >
                    <img
                      src="assets/images/icons/edit-2-white-fill.svg"
                      alt="icon"
                      className="size-6 shrink-0"
                    />
                    <p className="font-bold leading-5 text-white">
                      Change Avatar
                    </p>
                  </button>
                </section>
                {errors?.photo && (
                  <p className="mt-2 text-center text-sm text-red-500">
                    {errors?.photo?.message?.toString()}
                  </p>
                )}
              </div>
              <section id="Inputs" className="flex flex-col gap-7.5">
                <div className="">
                  <div
                    id="Fullname"
                    className="relative h-18 overflow-hidden has-invalid:border-heyhao-coral rounded-6 border-[1.5px] border-heyhao-border py-6 focus-within:border-heyhao-blue transition-all duration-300"
                  >
                    <input
                      {...register("name")}
                      id="FullName"
                      placeholder=""
                      type="text"
                      className="peer absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-transparent font-semibold leading-5 focus:outline-none pb-4 pl-20 pt-9"
                    />
                    <img
                      src="assets/images/icons/user-square-grey.svg"
                      alt="icon"
                      className="absolute left-6 top-1/2 size-6 shrink-0 -translate-y-1/2 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                    />
                    <div className="w-[1.5px] h-6 bg-heyhao-border absolute left-16 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"></div>
                    <label
                      htmlFor="FullName"
                      className="absolute left-20 text-heyhao-secondary transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 text-sm leading-[17.5px] font-medium top-4 peer-focus:top-4 translate-y-0 peer-focus:translate-y-0 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                    >
                      Enter your full name
                    </label>
                  </div>

                  {errors?.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors?.name?.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <div id="Email" className="relative">
                    <div className="relative h-18 has-invalid:border-heyhao-coral overflow-hidden rounded-6 border-[1.5px] border-heyhao-border py-6 focus-within:border-heyhao-blue transition-all duration-300">
                      <input
                        {...register("email")}
                        id="Email"
                        placeholder=""
                        type="email"
                        className="peer absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-transparent font-semibold leading-5 focus:outline-none pb-4 pl-20 pt-9 z-10"
                      />
                      <img
                        src="assets/images/icons/sms-grey.svg"
                        alt="icon"
                        className="absolute left-6 top-1/2 size-6 shrink-0 -translate-y-1/2 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                      />
                      <div className="w-[1.5px] h-6 bg-heyhao-border absolute left-16 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"></div>
                      <label
                        htmlFor="Email"
                        className="absolute left-20 text-heyhao-secondary transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 text-sm leading-[17.5px] font-medium top-4 peer-focus:top-4 translate-y-0 peer-focus:translate-y-0 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                      >
                        Your email address
                      </label>
                    </div>
                    {/* <img
                    id="EmailNotUsed"
                    src="assets/images/icons/checklist-green-fill.svg"
                    alt="icon"
                    className="absolute z-40 right-6 top-1/2 size-6 shrink-0 -translate-y-1/2"
                  />
                  <div
                    id="EmailUsed"
                    className="absolute -right-2.5 top-6 flex flex-col items-center gap-px peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                  >
                    <img
                      src="assets/images/icons/checklist-red-fill.svg"
                      alt="icon"
                      className="size-6 shrink-0"
                    />
                    <img
                      src="assets/images/icons/polygon-red-fill.svg"
                      alt="icon"
                      className="w-3.75 h-4.5 shrink-0"
                    />
                    <div className="bg-heyhao-coral mt-[-9.5px] relative z-30 px-3 py-1.5 rounded-lg text-white font-medium text-3 leading-3.75">
                      Email Used
                    </div>
                  </div> */}
                  </div>
                  {errors?.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors?.email?.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <div id="Password-Container" className="flex flex-col gap-3">
                    <div className="relative h-18 has-invalid:border-heyhao-coral overflow-hidden rounded-6 border-[1.5px] border-heyhao-border py-6 focus-within:border-heyhao-blue transition-all duration-300">
                      <button
                        type="button"
                        data-target="Password-Input"
                        className="show-password absolute right-6 transform -translate-y-1/2 top-1/2 z-30"
                      >
                        <img
                          src="assets/images/icons/eye-grey.svg"
                          alt="Hide password icon"
                          className="show-icon size-6 shrink-0"
                        />
                        <img
                          src="assets/images/icons/eye-slash-black.svg"
                          alt="Show password icon"
                          className="hide-icon size-6 shrink-0 hidden"
                        />
                      </button>
                      <input
                        {...register("password")}
                        id="Password-Input"
                        placeholder=""
                        type="password"
                        className="peer absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-transparent font-semibold leading-5 tracking-[0.2em] focus:outline-none pb-4 px-20 pt-9 z-10"
                      />
                      <div className="w-[1.5px] h-6 bg-heyhao-border absolute left-16 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"></div>
                      <img
                        src="assets/images/icons/lock-grey.svg"
                        alt="Lock icon"
                        className="absolute left-6 top-1/2 size-6 shrink-0 -translate-y-1/2 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                      />
                      <label
                        htmlFor="Password-Input"
                        className="absolute left-20 text-heyhao-secondary transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 text-sm leading-[17.5px] font-medium top-4 peer-focus:top-4 translate-y-0 peer-focus:translate-y-0 peer-focus:z-30 z-30 peer-placeholder-shown:z-0"
                      >
                        Password
                      </label>
                    </div>
                  </div>
                  {errors?.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors?.password?.message}
                    </p>
                  )}
                </div>
              </section>
            </div>
            <section id="Cta" className="flex flex-col gap-6">
              <button
                type="submit"
                disabled={isPending}
                className="bg-heyhao-blue rounded-full py-4 text-white w-full font-bold leading-5"
              >
                {isPending ? "Loading..." : "Create Account"}
              </button>
              <p className="font-semibold leading-5 text-center">
                Already Have Account?{" "}
                <Link
                  to="/sign-in"
                  className="text-heyhao-blue hover:underline"
                >
                  Login Now
                </Link>
              </p>
            </section>
          </form>
        </div>
      </main>
    </div>
  );
}
