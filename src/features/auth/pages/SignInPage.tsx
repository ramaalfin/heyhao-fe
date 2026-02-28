import { useForm } from "react-hook-form";

import CarouselImage from "../components/CarouselImage";
import { signInSchema, SignInValues } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "../hooks/useSignIn";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
    });

    const { mutateAsync, isPending } = useSignIn();

    const onSubmit = async (data: SignInValues) => {
        try {
            const response = await mutateAsync(data);

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
                                    Welcome Back!
                                </h1>
                                <p className="font-medium leading-5 text-center text-heyhao-secondary">
                                    Sign in to your account to continue
                                </p>
                            </header>
                            <section id="Inputs" className="flex flex-col gap-7.5">
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
                                {isPending ? "Loading..." : "Sign In"}
                            </button>
                            <p className="font-semibold leading-5 text-center">
                                Don't Have Account?{" "}
                                <a
                                    href="/sign-up"
                                    className="text-heyhao-blue hover:underline"
                                >
                                    Create Now
                                </a>
                            </p>
                            <p className="font-semibold leading-5 text-center">
                                Forgot Password?{" "}
                                <a
                                    href="/forgot-password"
                                    className="text-heyhao-blue hover:underline"
                                >
                                    Reset Password
                                </a>
                            </p>
                        </section>
                    </form>
                </div>
            </main>
        </div>
    );
}
