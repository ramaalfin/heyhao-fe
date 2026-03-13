import { Link } from "react-router";

export default function SidebarMenu() {
  return (
    <div
      id="Sidebar"
      className="flex flex-col w-[300px] shrink-0 h-screen rounded-l-3xl border-r border-heyhao-border bg-white overflow-hidden"
    >
      <div
        id="Top-Bar"
        className="flex items-center justify-between border-b border-heyhao-border py-6 px-5 gap-3"
      >
        <p className="font-semibold text-2xl">Dashboard</p>
        <ul className="flex gap-3">
          <li className="group">
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
        className="flex flex-col justify-between flex-1 pb-0 gap-6 overflow-hidden"
      >
        <div className="flex flex-col gap-4 p-6">
          <p className="font-medium">Main Menu</p>
          <div className="flex flex-col gap-1">
            <Link to="/home/revenue" className="group active">
              <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                <img
                  src="/assets/images/icons/wallet-3-grey.svg"
                  className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                  alt="icon"
                />
                <img
                  src="/assets/images/icons/wallet-3-black.svg"
                  className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                  alt="icon"
                />
                <p className="font-medium text-heyhao-secondary group-[.active]:font-semibold group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                  My Revenue Stat
                </p>
              </div>
            </Link>
            <Link to="/home/revenue/history" className="group">
              <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                <img
                  src="/assets/images/icons/note-grey.svg"
                  className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                  alt="icon"
                />
                <img
                  src="/assets/images/icons/note-black.svg"
                  className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                  alt="icon"
                />
                <p className="font-medium text-heyhao-secondary group-[.active]:font-semibold group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                  History Payout
                </p>
              </div>
            </Link>
            <Link to="/home/revenue/report" className="group">
              <div className="flex items-center rounded-xl p-4 gap-2 bg-white group-[.active]:bg-heyhao-grey group-hover:bg-heyhao-grey transition-all duration-300">
                <img
                  src="/assets/images/icons/status-up-grey.svg"
                  className="flex size-6 shrink-0 group-[.active]:hidden group-hover:hidden transition-all duration-300"
                  alt="icon"
                />
                <img
                  src="/assets/images/icons/status-up-black.svg"
                  className="hidden size-6 shrink-0 group-[.active]:flex group-hover:flex transition-all duration-300"
                  alt="icon"
                />
                <p className="font-medium text-heyhao-secondary group-[.active]:font-semibold group-[.active]:text-heyhao-black group-hover:text-black transition-all duration-300">
                  Earnings Report
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-heyhao-border p-6 gap-2">
          <div>
            <p className="font-medium">Having trouble?</p>
            <Link
              to="#"
              className="mt-2 font-medium text-sm text-heyhao-secondary hover:underline"
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
  );
}
