import { Link } from "react-router";
import SidebarMenu from "../components/SidebarMenu";

export default function SettingGroupPage() {
  return (
    <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
      <SidebarMenu />
      <main
        id="Main-Content-Container"
        className="relative flex flex-1 flex-col overflow-y-auto"
      >
        <div className="relative flex items-center justify-between w-full h-[112px] shrink-0 border-b border-heyhao-border bg-white p-[30px]">
          <h2 className="font-bold text-2xl leading-[30px]">My Own Groups</h2>
          <Link to="/home/setting/groups/create">
            <div className="flex items-center gap-2 py-[14px] px-[32px] rounded-full bg-heyhao-blue">
              <p className="font-bold leading-[20px] text-white text-center">
                Create New Group
              </p>
              <img
                src="/assets/images/icons/add-circle-white-fill.svg"
                alt="icon"
                className="size-6 shrink-0"
              />
            </div>
          </Link>
        </div>
        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden bg-heyhao-grey">
          <div className="w-full flex min-h-[calc(100vh-123px)] p-[30px]">
            <div className="flex flex-col gap-[30px] w-[836px] shrink-0">
              <section id="Conclusion" className="grid grid-cols-3 gap-4">
                <div className="card flex flex-col gap-2 p-6 bg-white rounded-2xl">
                  <div className="flex items-center gap-[6px]">
                    <div className="size-[44px] shrink-0 flex items-center justify-center rounded-xl bg-[#7F57F117]">
                      <img
                        src="/assets/images/icons/profile-2user-purple-fill.svg"
                        alt="icon"
                        className="size-6 shrink-0"
                      />
                    </div>
                    <h4 className="font-medium leading-5 text-heyhao-secondary">
                      Total Member
                    </h4>
                  </div>
                  <strong className="font-bold text-[32px] leading-[40px]">
                    200.450
                  </strong>
                </div>
                <div className="card flex flex-col gap-2 p-6 bg-white rounded-2xl">
                  <div className="flex items-center gap-[6px]">
                    <div className="size-[44px] shrink-0 flex items-center justify-center rounded-xl bg-[#165DFF17]">
                      <img
                        src="/assets/images/icons/crown-blue-fill.svg"
                        alt="icon"
                        className="size-6 shrink-0"
                      />
                    </div>
                    <h4 className="font-medium leading-5 text-heyhao-secondary">
                      VIP Groups
                    </h4>
                  </div>
                  <strong className="font-bold text-[32px] leading-[40px]">
                    192
                  </strong>
                </div>
                <div className="card flex flex-col gap-2 p-6 bg-white rounded-2xl">
                  <div className="flex items-center gap-[6px]">
                    <div className="size-[44px] shrink-0 flex items-center justify-center rounded-xl bg-[#30B22D17]">
                      <img
                        src="/assets/images/icons/verifiy-green-fill.svg"
                        alt="icon"
                        className="size-6 shrink-0"
                      />
                    </div>
                    <h4 className="font-medium leading-5 text-heyhao-secondary">
                      Free Groups
                    </h4>
                  </div>
                  <strong className="font-bold text-[32px] leading-[40px]">
                    321
                  </strong>
                </div>
              </section>
              <section id="Table-Data" className="pt-6 bg-white rounded-3xl">
                <table className="w-full">
                  <thead className="border-b border-heyhao-border">
                    <tr className="flex text-left mb-6 px-6">
                      <th className="w-full min-w-[420px] font-semibold leading-5">
                        Name & Total Members
                      </th>
                      <th className="w-full min-w-[204px] font-semibold leading-5 pl-6">
                        Type
                      </th>
                      <th className="w-full min-w-[130px] font-semibold leading-5 pl-[10px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="flex items-center border-b border-heyhao-border mt-6 pb-6 mx-6">
                      <td className="w-full min-w-[420px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="flex justify-center items-center size-[64px] shrink-0 rounded-full overflow-hidden">
                            <img
                              src="/assets/images/thumbnails/featured-2.png"
                              alt="image"
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-1 relative z-10">
                            <h3 className="line-clamp-1 font-semibold text-lg leading-[22.5px]">
                              Indonesia Laravel Creatives
                            </h3>
                            <div className="flex items-center gap-1">
                              <img
                                src="/assets/images/icons/profile-2user-green.svg"
                                alt="icon"
                                className="size-4 shrink-0"
                              />
                              <div className="flex gap-1">
                                <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">
                                  22.259
                                </p>
                                <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">
                                  Members
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="group vip w-full min-w-[204px] pl-6">
                        <div
                          id="Vip"
                          className="group-[&.vip]:flex group-[&.free]:hidden shrink-0 items-center gap-[2px] py-[6px] px-2 bg-[#165DFF17] rounded-full w-fit!"
                        >
                          <img
                            src="/assets/images/icons/crown-blue-fill.svg"
                            alt="icon"
                            className="size-4 shrink-0"
                          />
                          <p className="font-bold text-sm leading-[17.5px] text-heyhao-blue">
                            VIP
                          </p>
                        </div>
                        <div
                          id="Free"
                          className="group-[&.vip]:hidden group-[&.free]:flex shrink-0 items-center gap-[2px] py-[6px] px-[15.5px] bg-heyhao-grey rounded-full w-fit!"
                        >
                          <p className="font-bold text-sm leading-[17.5px] text-heyhao-secondary">
                            Free
                          </p>
                        </div>
                      </td>
                      <td className="w-full min-w-[130px] pl-[10px]">
                        <Link
                          to="/home/setting/group-manage-vip"
                          className="flexw-fit!"
                        >
                          <div className="px-[32px] py-4 bg-heyhao-black rounded-full w-fit!">
                            <p className="text-white font-bold leading-5">
                              Manage
                            </p>
                          </div>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section id="Pagination" className="mx-auto">
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
                      <Link to="/home/setting/#">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            1
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/home/setting/#">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            2
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/home/setting/#">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            3
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/home/setting/#">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            4
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="group">
                      <Link to="/home/setting/#">
                        <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                          <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">
                            5
                          </p>
                        </div>
                      </Link>
                    </li>
                  </div>
                  <div id="Step-After" className="group active shrink-0">
                    <button
                      type="button"
                      id="Step-After-Active"
                      className="group-[&.nonactive]:hidden group-[&.active]:block p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0"
                    >
                      <img
                        src="/assets/images/icons/arrow-left.svg"
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
                        src="/assets/images/icons/arrow-left-nonactive.svg"
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
