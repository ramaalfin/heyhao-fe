import SidebarMenu from "../components/SidebarMenu";

export default function SettingPage() {
  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <SidebarMenu />
      <main
        id="Main-Content-Container"
        className="relative flex flex-1 flex-col bg-white overflow-y-auto"
      >
        <div className="relative flex w-full h-[90px] shrink-0 border-b border-heyhao-border bg-white p-[30px]">
          <h2 className="font-bold text-2xl leading-[30px]">
            General Settings
          </h2>
        </div>
        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="w-full flex min-h-[calc(100vh-123px)]">
            <div className="w-full flex flex-col gap-[30px] p-[30px]">
              <section
                id="Theme-Appearance"
                className="flex items-center justify-between gap-6"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold leading-5">Theme Appearance</h4>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                    Quickly switch between light & dark
                  </p>
                </div>
                <div className="flex items-center gap-[12px]">
                  <div className="group flex flex-col gap-[12px] relative">
                    <input
                      required
                      checked
                      type="radio"
                      name="mode"
                      className="peer absolute left-0 right-0 top-0 bottom-0 z-30 opacity-0"
                    />
                    <div className="flex relative items-center justify-center overflow-hidden w-[210px] h-[140px] shrink-0 rounded-2xl">
                      <img
                        src="/assets/images/thumbnails/light-mode.png"
                        alt="image"
                        className="size-full object-cover"
                      />
                      <span className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] rounded-xl z-20 group-hover:ring-4 has-checked:ring-4 group-hover:ring-heyhao-blue group-has-checked:ring-heyhao-blue transition-all duration-300"></span>
                      <img
                        src="/assets/images/icons/checklist-blue-fill.svg"
                        alt="icon"
                        className="size-[18px] opacity-0 group-has-checked:opacity-100 shrink-0 absolute right-[13px] bottom-[13px] transition-all duration-300"
                      />
                    </div>
                    <p className="text-heyhao-secondary text-center font-medium group-hover:font-semibold peer-checked:font-semibold text-sm leading-[17.5px] group-hover:text-heyhao-blue peer-checked:text-heyhao-blue transition-all duration-300">
                      Light Mode
                    </p>
                  </div>
                  <div className="group flex flex-col gap-[12px] relative">
                    <input
                      required
                      type="radio"
                      name="mode"
                      className="peer absolute left-0 right-0 top-0 bottom-0 z-30 opacity-0"
                    />
                    <div className="flex relative items-center justify-center overflow-hidden w-[210px] h-[140px] shrink-0 rounded-2xl">
                      <img
                        src="/assets/images/thumbnails/dark-mode.png"
                        alt="image"
                        className="size-full object-cover"
                      />
                      <span className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] rounded-xl z-20 group-hover:ring-4 has-checked:ring-4 group-hover:ring-heyhao-blue group-has-checked:ring-heyhao-blue transition-all duration-300"></span>
                      <img
                        src="/assets/images/icons/checklist-blue-fill.svg"
                        alt="icon"
                        className="size-[18px] opacity-0 group-has-checked:opacity-100 shrink-0 absolute right-[13px] bottom-[13px] transition-all duration-300"
                      />
                    </div>
                    <p className="text-heyhao-secondary text-center font-medium group-hover:font-semibold peer-checked:font-semibold text-sm leading-[17.5px] group-hover:text-heyhao-blue peer-checked:text-heyhao-blue transition-all duration-300">
                      Dark mode (Unavailable)
                    </p>
                  </div>
                </div>
              </section>
              <hr className="border-heyhao-border" />
              <section
                id="Language-Settings"
                className="flex items-center justify-between gap-6"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold leading-5">Language Settings</h4>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                    Set the language you use
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded-xl border border-heyhao-border py-3 px-4">
                  <img
                    src="/assets/images/logos/uk-flag.svg"
                    className="flex size-[30px] shrink-0 rounded-full overflow-hidden object-cover"
                    alt="flag"
                  />
                  <div className="flex items-center gap-1">
                    <span className="font-semibold leading-[22px]">
                      English UK
                    </span>
                    <img
                      src="/assets/images/icons/arrow-down.svg"
                      className="flex size-3 shrink-0"
                      alt="icon"
                    />
                  </div>
                </button>
              </section>
              <hr className="border-heyhao-border" />
              <section
                id="Use-Enter-As-Send"
                className="flex items-center justify-between gap-6"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold leading-5">Use Enter As Send</h4>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                    Send messages in a blink!
                  </p>
                </div>
                <label className="group">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="hidden"
                    checked
                  />
                  <div className="relative w-[50px] h-[30px]">
                    <img
                      src="/assets/images/icons/toggle-off.svg"
                      className="absolute inset-0 object-contain opacity-100 group-has-checked:opacity-0 transition-all duration-300"
                      alt="toggle"
                    />
                    <img
                      src="/assets/images/icons/toggle-on.svg"
                      className="absolute inset-0 object-contain opacity-0 group-has-checked:opacity-100 transition-all duration-300"
                      alt="toggle"
                    />
                  </div>
                </label>
              </section>
              <hr className="border-heyhao-border" />
              <section
                id="Notifications"
                className="flex items-center justify-between gap-6"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold leading-5">Notifications</h4>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                    Set your notifications
                  </p>
                </div>
                <label className="group">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="hidden"
                    checked
                  />
                  <div className="relative w-[50px] h-[30px]">
                    <img
                      src="/assets/images/icons/toggle-off.svg"
                      className="absolute inset-0 object-contain opacity-100 group-has-checked:opacity-0 transition-all duration-300"
                      alt="toggle"
                    />
                    <img
                      src="/assets/images/icons/toggle-on.svg"
                      className="absolute inset-0 object-contain opacity-0 group-has-checked:opacity-100 transition-all duration-300"
                      alt="toggle"
                    />
                  </div>
                </label>
              </section>
              <hr className="border-heyhao-border" />
              <section
                id="Font-Scaling"
                className="flex items-center justify-between gap-6"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold leading-5">Font Scaling</h4>
                  <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                    Adjust your font size
                  </p>
                </div>
                <div className="w-[480px] flex items-center relative pb-[2px]">
                  <div
                    id="Progress-Bar"
                    className="h-5 w-full absolute left-0 bottom-0 flex items-center z-30"
                  >
                    <div
                      id="Slider-Bar-Non-Active"
                      className="w-full h-2 bg-[#EAF0FF] flex items-center rounded-full"
                    >
                      <div
                        id="Slider-Bar-active"
                        className="relative w-[164px] rounded-full bg-heyhao-blue h-2"
                      >
                        <div
                          id="Point-Bar"
                          className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 size-5 rounded-full bg-heyhao-blue ring-2 ring-white shrink-0"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="group pass flex flex-col gap-2 items-center w-fit [&.active]:mb-auto">
                    <p className="font-semibold text-[10px] leading-[12.5px] text-heyhao-secondary group-[&.active]:text-heyhao-black">
                      12px
                    </p>
                    <span className="h-4 w-[1.5px] rounded-full bg-[#EAF0FF] group-[&.pass]:bg-heyhao-blue group-[&.active]:hidden"></span>
                  </div>
                  <div className="group pass flex flex-col gap-2 items-center w-fit [&.active]:mb-auto ml-[13.83px]">
                    <p className="font-semibold text-[10px] leading-[12.5px] text-heyhao-secondary group-[&.active]:text-heyhao-black">
                      13px
                    </p>
                    <span className="h-4 w-[1.5px] rounded-full bg-[#EAF0FF] group-[&.pass]:bg-heyhao-blue group-[&.active]:hidden"></span>
                  </div>
                  <div className="group pass flex flex-col gap-2 items-center w-fit [&.active]:mb-auto ml-[13.83px]">
                    <p className="font-semibold text-[10px] leading-[12.5px] text-heyhao-secondary group-[&.active]:text-heyhao-black">
                      14px
                    </p>
                    <span className="h-4 w-[1.5px] rounded-full bg-[#EAF0FF] group-[&.pass]:bg-heyhao-blue group-[&.active]:hidden"></span>
                  </div>
                  <div className="group active flex flex-col gap-2 items-center w-fit [&.active]:mb-auto ml-[51.67px]">
                    <p className="font-semibold text-[10px] leading-[12.5px] text-heyhao-secondary group-[&.active]:text-heyhao-black">
                      16px
                    </p>
                    <span className="h-4 w-[1.5px] rounded-full bg-[#EAF0FF] group-[&.pass]:bg-heyhao-blue group-[&.active]:hidden"></span>
                  </div>
                  <div className="group flex flex-col gap-2 items-center w-fit [&.active]:mb-auto ml-[51.67px]">
                    <p className="font-semibold text-[10px] leading-[12.5px] text-heyhao-secondary group-[&.active]:text-heyhao-black">
                      18px
                    </p>
                    <span className="h-4 w-[1.5px] rounded-full bg-[#EAF0FF] group-[&.pass]:bg-heyhao-blue group-[&.active]:hidden"></span>
                  </div>
                  <div className="group flex flex-col gap-2 items-center w-fit [&.active]:mb-auto ml-[51.67px]">
                    <p className="font-semibold text-[10px] leading-[12.5px] text-heyhao-secondary group-[&.active]:text-heyhao-black">
                      20px
                    </p>
                    <span className="h-4 w-[1.5px] rounded-full bg-[#EAF0FF] group-[&.pass]:bg-heyhao-blue group-[&.active]:hidden"></span>
                  </div>
                  <div className="group flex flex-col gap-2 items-center w-fit [&.active]:mb-auto ml-[51.67px]">
                    <p className="font-semibold text-[10px] leading-[12.5px] text-heyhao-secondary group-[&.active]:text-heyhao-black">
                      22px
                    </p>
                    <span className="h-4 w-[1.5px] rounded-full bg-[#EAF0FF] group-[&.pass]:bg-heyhao-blue group-[&.active]:hidden"></span>
                  </div>
                  <div className="group flex flex-col gap-2 items-center w-fit [&.active]:mb-auto ml-[51.67px]">
                    <p className="font-semibold text-[10px] leading-[12.5px] text-heyhao-secondary group-[&.active]:text-heyhao-black">
                      24px
                    </p>
                    <span className="h-4 w-[1.5px] rounded-full bg-[#EAF0FF] group-[&.pass]:bg-heyhao-blue group-[&.active]:hidden"></span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
