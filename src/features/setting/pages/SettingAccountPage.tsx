import secureLocalStorage from "react-secure-storage";
import SidebarMenu from "../components/SidebarMenu";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { SignUpResponse } from "../../auth/api/signUp";

export default function SettingAccountPage() {
  const auth = secureLocalStorage.getItem(AUTH_KEY) as SignUpResponse;

  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <SidebarMenu />
      <main
        id="Main-Content-Container"
        className="relative flex flex-1 flex-col bg-white overflow-y-auto"
      >
        <div className="relative flex items-center w-full h-[90px] shrink-0 border-b border-heyhao-border bg-white p-[30px]">
          <h2 className="font-bold text-2xl leading-[30px]">My Account</h2>
        </div>
        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="w-full flex min-h-[calc(100vh-123px)] p-[30px] justify-center">
            <div className="flex flex-col gap-[30px] w-[435px]">
              <section
                id="Avatar"
                className="flex items-center flex-col gap-[12px]"
              >
                <div className="flex items-center justify-center rounded-full overflow-hidden size-[100px] shrink-0">
                  <img
                    id="photo-container"
                    src={auth?.photo || "/assets/images/photos/my-account.png"}
                    alt="image"
                    className="object-cover size-full"
                  />
                </div>
                <input
                  id="file-input"
                  type="file"
                  className="absolute opacity-0"
                />
                <button
                  type="button"
                  id="add-photo"
                  className="flex items-center gap-[6px] px-[24px] py-[14px] rounded-full bg-heyhao-black"
                >
                  <img
                    src="/assets/images/icons/edit-2-white-fill.svg"
                    alt="icon"
                    className="size-6 shrink-0"
                  />
                  <p className="font-bold leading-[20px] text-white">
                    Change Avatar
                  </p>
                </button>
              </section>
              <section id="Inputs" className="flex flex-col gap-[30px]">
                <div id="Email" className="relative">
                  <div className="relative h-[72px] overflow-hidden rounded-[24px] bg-heyhao-border py-[24px]">
                    <img
                      src="/assets/images/icons/sms-grey.svg"
                      alt="icon"
                      className="absolute left-[24px] top-1/2 size-[24px] shrink-0 -translate-y-1/2"
                    />
                    <input
                      readOnly
                      id="Email"
                      placeholder=""
                      type="email"
                      value={auth?.email ?? "-"}
                      className="peer absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-transparent font-semibold leading-[20px] focus:outline-none pb-[16px] pl-[80px] pt-[36px] z-10"
                    />
                    <label
                      htmlFor="Email"
                      className="absolute left-[80px] text-heyhao-secondary transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 text-sm leading-[17.5px] font-medium top-4 peer-focus:top-4 translate-y-0 peer-focus:translate-y-0"
                    >
                      Your email address
                    </label>
                  </div>
                </div>
                <div id="Fullname" className="relative">
                  <div className="relative h-[72px] overflow-hidden rounded-[24px] bg-white py-[24px] border-[1.5px] border-heyhao-border">
                    <img
                      src="/assets/images/icons/user-square-grey.svg"
                      alt="icon"
                      className="absolute left-[24px] top-1/2 size-[24px] shrink-0 -translate-y-1/2"
                    />
                    <div className="w-[1.5px] h-6 bg-heyhao-border absolute left-[64px]"></div>
                    <input
                      readOnly
                      id="Fullname"
                      placeholder=""
                      type="text"
                      value={auth?.name ?? "-"}
                      className="peer absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-transparent font-semibold leading-[20px] focus:outline-none pb-[16px] pl-[80px] pt-[36px] z-10"
                    />
                    <label
                      htmlFor="Fullname"
                      className="absolute left-[80px] text-heyhao-secondary transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 text-sm leading-[17.5px] font-medium top-4 peer-focus:top-4 translate-y-0 peer-focus:translate-y-0"
                    >
                      Enter your full name
                    </label>
                  </div>
                </div>
                <div id="Password" className="relative">
                  <div className="relative h-[72px] overflow-hidden rounded-[24px] bg-white py-[24px] border-[1.5px] border-heyhao-border">
                    <img
                      src="/assets/images/icons/lock-grey.svg"
                      alt="icon"
                      className="absolute left-[24px] top-1/2 size-[24px] shrink-0 -translate-y-1/2"
                    />
                    <div className="w-[1.5px] h-6 bg-heyhao-border absolute left-[64px]"></div>
                    <button
                      type="button"
                      data-target="Password-Input"
                      className="show-password absolute right-[24px] transform -translate-y-1/2 top-1/2 z-30"
                    >
                      <img
                        src="/assets/images/icons/eye-grey.svg"
                        alt="Hide password icon"
                        className="show-icon size-[24px] shrink-0"
                      />
                      <img
                        src="/assets/images/icons/eye-slash-black.svg"
                        alt="Show password icon"
                        className="hide-icon size-[24px] shrink-0 hidden"
                      />
                    </button>
                    <input
                      readOnly
                      id="Password-Input"
                      placeholder=""
                      type="password"
                      value="rahasia rahasia"
                      className="peer absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-transparent font-semibold leading-[20px] tracking-[0.2em] focus:outline-none pb-[16px] px-[80px] pt-[36px] z-10"
                    />
                    <label
                      htmlFor="Password"
                      className="absolute left-[80px] text-heyhao-secondary transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 text-sm leading-[17.5px] font-medium top-4 peer-focus:top-4 translate-y-0 peer-focus:translate-y-0"
                    >
                      Your Password
                    </label>
                  </div>
                </div>
              </section>
              <section id="Buttons" className="flex flex-col gap-[12px]">
                <a href="">
                  <div className="bg-heyhao-blue rounded-full justify-center flex py-4 text-white w-full font-bold leading-[20px]">
                    Update Profile
                  </div>
                </a>
                <a href="">
                  <div className="bg-[#ED6B6017] rounded-full justify-center flex py-4 text-heyhao-coral w-full font-bold leading-[20px]">
                    Log Out
                  </div>
                </a>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
