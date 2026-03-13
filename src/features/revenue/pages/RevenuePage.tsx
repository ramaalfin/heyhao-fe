import { Link } from "react-router";
import SidebarMenu from "../components/SidebarMenu";
import ChartRevenue from "../components/ChartRevenue";

export default function RevenuePage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SidebarMenu />

      <main id="Main-Content-Container" className="relative flex flex-1">
        <div className="flex flex-col flex-1">
          <div
            id="Header"
            className="relative flex w-full h-[93px] shrink-0 border-b border-heyhao-border bg-white p-[30px] gap-[10px]"
          >
            <h1 className="font-bold text-2xl leading-[30px]">
              My Revenue Stat
            </h1>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div
              id="Content"
              className="flex flex-col w-full max-w-[836px] shrink-0 overflow-y-scroll hide-scrollbar mx-[30px] py-[30px] gap-4"
            >
              <div id="Withdraw-Money" className="flex gap-4">
                <div className="flex flex-col w-[500px] shrink-0 rounded-2xl border border-heyhao-border gap-6 bg-white">
                  <div className="flex flex-col gap-6 p-6 pb-0">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/assets/images/icons/wallet-green-opacity.svg"
                          className="flex size-11 shrink-0"
                          alt="icon"
                        />
                        <p className="font-medium text-heyhao-secondary">
                          Balance Available
                        </p>
                      </div>
                      <div className="flex items-center gap-3 justify-between">
                        <p className="font-bold text-[32px] leading-10">
                          Rp12.500.000
                        </p>
                        <button className="flex items-center gap-2 rounded-full p-2 pr-4 bg-heyhao-grey">
                          <img
                            src="/assets/images/icons/idr-flag.svg"
                            className="flex size-8 shrink-0"
                            alt="icon"
                          />
                          <p className="font-bold">IDR</p>
                        </button>
                      </div>
                    </div>
                    <Link
                      to="/withdraw-money"
                      className="rounded-full bg-heyhao-blue flex items-center justify-center gap-[10px] py-4 text-white w-full font-bold leading-[20px] text-center"
                    >
                      <p>Withdraw Money</p>
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 p-6 border-t border-heyhao-border">
                    <img
                      src="/assets/images/icons/clock-grey-fill.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                    <p className="font-semibold text-heyhao-secondary">
                      The withdrawal process takes around 30 minutes.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <div className="flex flex-col rounded-2xl border border-heyhao-border p-6 gap-3 bg-white">
                    <div className="flex items-center gap-[6px]">
                      <img
                        src="/assets/images/icons/crown-blue-opacity.svg"
                        className="flex size-11 shrink-0"
                        alt="icon"
                      />
                      <p className="font-medium text-heyhao-secondary">
                        VIP Groups
                      </p>
                    </div>
                    <p className="font-bold text-[32px] leading-10">192</p>
                  </div>
                  <div className="flex flex-col rounded-2xl border border-heyhao-border p-6 gap-3 bg-white">
                    <div className="flex items-center gap-[6px]">
                      <img
                        src="/assets/images/icons/profile-2-user-purple-opacity.svg"
                        className="flex size-11 shrink-0"
                        alt="icon"
                      />
                      <p className="font-medium text-heyhao-secondary">
                        Total Member VIP
                      </p>
                    </div>
                    <p className="font-bold text-[32px] leading-10">200.450</p>
                  </div>
                </div>
              </div>

              <ChartRevenue />

              <div
                id="Users"
                className="flex flex-col gap-[30px] justify-center"
              >
                <div className="flex flex-col rounded-3xl border border-heyhao-border bg-white">
                  <div
                    id="Header-Row"
                    className="flex items-center gap-[30px] p-6"
                  >
                    <div className="flex items-center w-[250px] shrink-0">
                      <p className="font-semibold">Nama Pengguna</p>
                    </div>
                    <div className="flex items-center w-[348px] shrink-0">
                      <p className="font-semibold">VIP Groups</p>
                    </div>
                    <div className="flex items-center w-[130px] shrink-0">
                      <p className="font-semibold">Status</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-[500px] border-t border-heyhao-border gap-6">
                    <img
                      src="/assets/images/icons/card-remove-grey.svg"
                      className="flex size-[52px] shrink-0"
                      alt="icon"
                    />
                    <p className="font-medium text-lg text-heyhao-secondary text-center">
                      Seems like your transactions <br />
                      haven’t shown up yet!
                    </p>
                  </div>
                </div>
                <div className="flex flex-col rounded-3xl border border-heyhao-border bg-white">
                  <div
                    id="Header-Row"
                    className="flex items-center gap-[30px] p-6"
                  >
                    <div className="flex items-center w-[250px] shrink-0">
                      <p className="font-semibold">Nama Pengguna</p>
                    </div>
                    <div className="flex items-center w-[348px] shrink-0">
                      <p className="font-semibold">VIP Groups</p>
                    </div>
                    <div className="flex items-center w-[130px] shrink-0">
                      <p className="font-semibold">Status</p>
                    </div>
                  </div>
                  <div className="user-row flex items-center gap-[30px] p-6 border-t border-heyhao-border">
                    <div className="flex items-center w-[250px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/photo-2.png"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col w-full gap-[6px]">
                          <p className="font-semibold max-w-[187px] leading-5 truncate">
                            Masayoshi
                          </p>
                          <p className="flex items-center font-semibold text-sm text-heyhao-secondary">
                            <img
                              src="/assets/images/icons/calendar-2.svg"
                              className="flex size-4 shrink-0"
                              alt="icon"
                            />
                            Joined: 29 May 2024
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[348px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/laravel.svg"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] w-full">
                          <div className="flex items-center gap-3 w-full">
                            <p className="font-semibold max-w-[237px] leading-5 truncate">
                              Indonesia Laravel Creatives
                            </p>
                            <p className="badge rounded-full w-fit py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                              VIP
                            </p>
                          </div>
                          <p className="flex items-center font-semibold text-sm text-heyhao-coral">
                            Rp22.000.000
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[130px] shrink-0">
                      <p className="rounded-[50px] py-4 px-6 bg-heyhao-green font-bold leading-5 text-white">
                        Success
                      </p>
                    </div>
                  </div>
                  <div className="user-row flex items-center gap-[30px] p-6 border-t border-heyhao-border">
                    <div className="flex items-center w-[250px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/photo-3.png"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col w-full gap-[6px]">
                          <p className="font-semibold max-w-[187px] leading-5 truncate">
                            Masayoshi
                          </p>
                          <p className="flex items-center font-semibold text-sm text-heyhao-secondary">
                            <img
                              src="/assets/images/icons/calendar-2.svg"
                              className="flex size-4 shrink-0"
                              alt="icon"
                            />
                            Joined: 29 May 2024
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[348px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/bwa.svg"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] w-full">
                          <div className="flex items-center gap-3 w-full">
                            <p className="font-semibold max-w-[237px] leading-5 truncate">
                              Laravel PHP Indonesia
                            </p>
                            <p className="badge rounded-full w-fit py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                              VIP
                            </p>
                          </div>
                          <p className="flex items-center font-semibold text-sm text-heyhao-coral">
                            Rp22.000.000
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[130px] shrink-0">
                      <p className="rounded-[50px] py-4 px-6 bg-heyhao-green font-bold leading-5 text-white">
                        Success
                      </p>
                    </div>
                  </div>
                  <div className="user-row flex items-center gap-[30px] p-6 border-t border-heyhao-border">
                    <div className="flex items-center w-[250px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/photo-4.png"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col w-full gap-[6px]">
                          <p className="font-semibold max-w-[187px] leading-5 truncate">
                            Masayoshi
                          </p>
                          <p className="flex items-center font-semibold text-sm text-heyhao-secondary">
                            <img
                              src="/assets/images/icons/calendar-2.svg"
                              className="flex size-4 shrink-0"
                              alt="icon"
                            />
                            Joined: 29 May 2024
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[348px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/group-3.svg"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] w-full">
                          <div className="flex items-center gap-3 w-full">
                            <p className="font-semibold max-w-[237px] leading-5 truncate">
                              Laravel PHP Indonesia
                            </p>
                            <p className="badge rounded-full w-fit py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                              VIP
                            </p>
                          </div>
                          <p className="flex items-center font-semibold text-sm text-heyhao-coral">
                            Rp22.000.000
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[130px] shrink-0">
                      <p className="rounded-[50px] py-4 px-6 bg-heyhao-green font-bold leading-5 text-white">
                        Success
                      </p>
                    </div>
                  </div>
                  <div className="user-row flex items-center gap-[30px] p-6 border-t border-heyhao-border">
                    <div className="flex items-center w-[250px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/photo-1.png"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col w-full gap-[6px]">
                          <p className="font-semibold max-w-[187px] leading-5 truncate">
                            Masayoshi
                          </p>
                          <p className="flex items-center font-semibold text-sm text-heyhao-secondary">
                            <img
                              src="/assets/images/icons/calendar-2.svg"
                              className="flex size-4 shrink-0"
                              alt="icon"
                            />
                            Joined: 29 May 2024
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[348px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/bwa.svg"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] w-full">
                          <div className="flex items-center gap-3 w-full">
                            <p className="font-semibold max-w-[237px] leading-5 truncate">
                              Laravel PHP Indonesia
                            </p>
                            <p className="badge rounded-full w-fit py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                              VIP
                            </p>
                          </div>
                          <p className="flex items-center font-semibold text-sm text-heyhao-coral">
                            Rp22.000.000
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[130px] shrink-0">
                      <p className="rounded-[50px] py-4 px-6 bg-heyhao-green font-bold leading-5 text-white">
                        Success
                      </p>
                    </div>
                  </div>
                  <div className="user-row flex items-center gap-[30px] p-6 border-t border-heyhao-border">
                    <div className="flex items-center w-[250px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/photo-2.png"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col w-full gap-[6px]">
                          <p className="font-semibold max-w-[187px] leading-5 truncate">
                            Masayoshi
                          </p>
                          <p className="flex items-center font-semibold text-sm text-heyhao-secondary">
                            <img
                              src="/assets/images/icons/calendar-2.svg"
                              className="flex size-4 shrink-0"
                              alt="icon"
                            />
                            Joined: 29 May 2024
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[348px] shrink-0">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden">
                          <img
                            src="/assets/images/photos/group.svg"
                            className="w-full h-full object-cover"
                            alt="photo"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] w-full">
                          <div className="flex items-center gap-3 w-full">
                            <p className="font-semibold max-w-[237px] leading-5 truncate">
                              Belajar Laravel Bersama Developer Lain
                            </p>
                            <p className="badge rounded-full w-fit py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                              VIP
                            </p>
                          </div>
                          <p className="flex items-center font-semibold text-sm text-heyhao-coral">
                            Rp22.000.000
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-[130px] shrink-0">
                      <p className="rounded-[50px] py-4 px-6 bg-heyhao-green font-bold leading-5 text-white">
                        Success
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <section id="Pagination" className="mx-auto mt-[14px]">
                <ul className="flex items-center gap-4">
                  <div id="Step-Before" className="group nonactive shrink-0">
                    <button
                      type="button"
                      id="Step-Before-Active"
                      className="group-[&.nonactive]:hidden group-[&.active]:block p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
                    >
                      <img
                        src="/assets/images/icons/arrow-left.svg"
                        alt="icon"
                        className="size-6"
                      />
                    </button>
                    <button
                      disabled
                      type="button"
                      id="Step-Before-Nonactive"
                      className="group-[&.nonactive]:block group-[&.active]:hidden p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
                    >
                      <img
                        src="/assets/images/icons/arrow-left-nonactive.svg"
                        alt="icon"
                        className="size-6"
                      />
                    </button>
                  </div>
                  <div id="Steps" className="flex items-center gap-4">
                    <li className="group active">
                      <a href="">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            1
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="group">
                      <a href="">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            2
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="group">
                      <a href="">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            3
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="group">
                      <a href="">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            4
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="group">
                      <a href="">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            5
                          </p>
                        </div>
                      </a>
                    </li>
                  </div>
                  <div id="Step-After" className="group active shrink-0">
                    <button
                      type="button"
                      id="Step-After-Active"
                      className="group-[&.nonactive]:hidden group-[&.active]:block p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
                    >
                      <img
                        src="assets/images/icons/arrow-left.svg"
                        alt="icon"
                        className="size-6 rotate-180"
                      />
                    </button>
                    <button
                      disabled
                      type="button"
                      id="Step-After-Nonactive"
                      className="group-[&.nonactive]:block group-[&.active]:hidden p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
                    >
                      <img
                        src="assets/images/icons/arrow-left-nonactive.svg"
                        alt="icon"
                        className="size-6 rotate-180"
                      />
                    </button>
                  </div>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
