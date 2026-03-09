import { Link, useLocation } from "react-router";

export default function SidebarMenu() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="flex h-screen w-fit">
      <div
        id="Sidebar"
        className="flex flex-col w-[300px] shrink-0 h-screen rounded-l-3xl border-r border-heyhao-border bg-white overflow-hidden"
      >
        <div
          id="Top-Bar"
          className="flex items-center justify-between border-b border-heyhao-border py-[22.5px] px-5 gap-3"
        >
          <h1 className="font-semibold text-2xl leading-[30px]">Settings</h1>
          <ul className="flex gap-3">
            <li
              className={`group ${pathname === "/home/setting" ? "active" : ""}`}
            >
              <button
                id="Search"
                className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              >
                <img
                  src="/assets/images/icons/search-normal-black.svg"
                  className="size-6"
                  alt="icon"
                />
              </button>
            </li>
          </ul>
        </div>
        <div
          id="Menu"
          className="flex flex-col p-5 pb-[114px] justify-between gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex flex-col gap-4">
            <h3 className="font-medium leading-5">Main Menu</h3>
            <div className="flex flex-col gap-1">
              <Link
                to="/home/setting"
                className={`group ${pathname === "/home/setting" ? "active" : ""}`}
              >
                <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                  <img
                    src="/assets/images/icons/setting-2.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/setting-2-black.svg"
                    className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                    alt="icon"
                  />
                  <p className="group-[.active]:font-semibold group-hover:font-semibold font-medium leading-5 text-heyhao-secondary group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                    General Settings
                  </p>
                </div>
              </Link>
              <Link
                to="/home/setting/account"
                className={`group ${pathname === "/home/setting/account" ? "active" : ""}`}
              >
                <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                  <img
                    src="/assets/images/icons/user-square-nonactive.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/user-square-active.svg"
                    className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                    alt="icon"
                  />
                  <p className="group-[.active]:font-semibold group-hover:font-semibold font-medium leading-5 text-heyhao-secondary group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                    My Account
                  </p>
                </div>
              </Link>
              <Link
                to="/home/setting/groups"
                className={`group ${pathname === "/home/setting/groups" ? "active" : ""}`}
              >
                <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                  <img
                    src="/assets/images/icons/crown-grey.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/crown-black.svg"
                    className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                    alt="icon"
                  />
                  <p className="group-[.active]:font-semibold group-hover:font-semibold font-medium leading-5 text-heyhao-secondary group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                    My Own Groups
                  </p>
                </div>
              </Link>
              <Link to="/home/setting/notifications" className="">
                <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                  <img
                    src="/assets/images/icons/notification-grey.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/notification-black.svg"
                    className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                    alt="icon"
                  />
                  <p className="group-[.active]:font-semibold group-hover:font-semibold font-medium leading-5 text-heyhao-secondary group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                    Notifications
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-medium leading-5">More Info & Support</h3>
            <div className="flex flex-col gap-1">
              <Link to="/#" className="">
                <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                  <img
                    src="/assets/images/icons/firstline-grey.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/firstline-black.svg"
                    className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                    alt="icon"
                  />
                  <p className="group-[.active]:font-semibold group-hover:font-semibold font-medium leading-5 text-heyhao-secondary group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                    Log Activity
                  </p>
                </div>
              </Link>
              <Link to="/#" className="">
                <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                  <img
                    src="/assets/images/icons/note-2-grey.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/note-2-black.svg"
                    className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                    alt="icon"
                  />
                  <p className="group-[.active]:font-semibold group-hover:font-semibold font-medium leading-5 text-heyhao-secondary group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                    Community Standard
                  </p>
                </div>
              </Link>
              <Link to="/#" className="">
                <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                  <img
                    src="/assets/images/icons/direct-inbox-grey.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/direct-inbox-black.svg"
                    className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                    alt="icon"
                  />
                  <p className="group-[.active]:font-semibold group-hover:font-semibold font-medium leading-5 text-heyhao-secondary group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                    Cookie Privacy
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="fixed bottom-0 left-[84px] w-[300px]">
            <div className="flex items-center justify-between border-t border-r bg-white border-heyhao-border p-6 gap-2 rounded-bl-3xl">
              <div>
                <p className="font-medium leading-5">Having trouble?</p>
                <Link
                  to="/#"
                  className="-2 font-medium text-sm leading-[17.5px] text-heyhao-secondary hover:underline"
                >
                  Contact Help Center now!
                </Link>
              </div>
              <img
                src="/assets/images/icons/message-question-blue-opacity.svg"
                className="flex size-11 shrink-0"
                alt="icon"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
