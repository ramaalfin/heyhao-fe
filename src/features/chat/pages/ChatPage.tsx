import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { RoomResponseValues } from "../schema/getRoomSchema";
import { SignInResponse } from "../../auth/api/signIn";
import { useGetRooms } from "../hooks/useGetRooms";
import dayjs from "dayjs";
import ActiveRoom from "../components/ActiveRoom";

export default function ChatPage() {
  const auth = secureLocalStorage.getItem(AUTH_KEY) as SignInResponse;

  const [searchValue, setSearchValue] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | "Groups" | "People">(
    "All",
  );
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const isSearching = searchValue.trim().length > 0;

  const { rooms } = useGetRooms();

  const getProfile = useCallback((chat: RoomResponseValues) => {
    if (chat.is_group) {
      return {
        name: chat.group?.name,
        photo_url: chat.group?.photo_url,
        message:
          chat.messages.length > 0
            ? {
                content: chat.messages[0].content,
                created_at: chat.messages[0].created_at,
                type: chat.messages[0].type,
                sender: chat.messages[0].user,
              }
            : null,
      };
    }

    const profileMember = chat.members.find(
      (member) => member.user.id !== auth.id,
    );
    return {
      name: profileMember?.user.name,
      photo_url: profileMember?.user.photo_url,
      message:
        chat.messages.length > 0
          ? {
              content: chat.messages[0].content,
              created_at: chat.messages[0].created_at,
              type: chat.messages[0].type,
              sender: chat.messages[0].user,
            }
          : null,
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <React.Fragment>
      <div className="flex w-full bg-heyhao-grey">
        <aside className="flex h-screen ">
          <div
            id="Sidebar"
            className="flex flex-col w-[360px] shrink-0 h-screen rounded-l-3xl border-r border-heyhao-border bg-white overflow-hidden"
          >
            <div
              id="Top-Bar"
              className="flex items-center justify-between border-b border-heyhao-border py-6 px-5 gap-3"
            >
              <p className="font-semibold text-2xl">Chats</p>
              <ul className="flex gap-3">
                <li className="group">
                  <Link
                    to="#"
                    className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                  >
                    <img
                      src="/assets/images/icons/document-filter.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </Link>
                </li>
                <li className="group">
                  <button
                    id="Search"
                    onClick={() => setIsSearchModalOpen(true)}
                    className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                  >
                    <img
                      src="/assets/images/icons/search-normal.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </button>
                </li>
              </ul>
            </div>
            <div
              id="Menu"
              className="flex flex-col flex-1 p-5 pb-0 gap-5 overflow-hidden"
            >
              <Link to="/discover">
                <div className="relative flex items-center rounded-2xl ring-1 ring-heyhao-border overflow-hidden hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                  <img
                    src="/assets/images/backgrounds/discover-group-bg.png"
                    className="absolute w-full h-full object-cover"
                    alt="background"
                  />
                  <div className="relative flex items-center justify-between rounded-2xl w-full p-5 gap-[10px]">
                    <div>
                      <p className="font-medium leading-5">
                        Discover More Groups
                      </p>
                      <p className="font-medium text-sm text-heyhao-secondary">
                        Tingkatkan skills & networking
                      </p>
                    </div>
                    <img
                      src="/assets/images/icons/crown-blue-bg.svg"
                      className="flex size-11 shrink-0"
                      alt="icon"
                    />
                  </div>
                </div>
              </Link>
              <div
                id="Tab-Buttons-Container"
                className="flex items-center gap-0.5 rounded-xl p-1 bg-heyhao-grey"
              >
                <button
                  type="button"
                  className={`tab-btn group w-full ${activeTab === "All" ? "active" : ""}`}
                  onClick={() => setActiveTab("All")}
                >
                  <div className="w-full rounded-xl py-[10px] px-6 text-center group-[.active]:bg-white group-hover:bg-white transition-all duration-300">
                    <span className="text-heyhao-secondary group-[.active]:font-medium group-[.active]:text-heyhao-blue group-hover:text-heyhao-blue transition-all duration-300">
                      All
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`tab-btn group w-full ${activeTab === "Groups" ? "active" : ""}`}
                  onClick={() => setActiveTab("Groups")}
                >
                  <div className="w-full rounded-xl py-[10px] px-6 text-center group-[.active]:bg-white group-hover:bg-white transition-all duration-300">
                    <span className="text-heyhao-secondary group-[.active]:font-medium group-[.active]:text-heyhao-blue group-hover:text-heyhao-blue transition-all duration-300">
                      Groups
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`tab-btn group w-full ${activeTab === "People" ? "active" : ""}`}
                  onClick={() => setActiveTab("People")}
                >
                  <div className="w-full rounded-xl py-[10px] px-6 text-center group-[.active]:bg-white group-hover:bg-white transition-all duration-300">
                    <span className="text-heyhao-secondary group-[.active]:font-medium group-[.active]:text-heyhao-blue group-hover:text-heyhao-blue transition-all duration-300">
                      People
                    </span>
                  </div>
                </button>
              </div>
              <div
                id="tabs-content-container"
                className="flex flex-1 h-full overflow-hidden"
              >
                <div id="All" className="relative tab-content w-full h-full">
                  <div className="flex flex-col h-full gap-1">
                    <p className="text-sm text-heyhao-secondary">
                      All Message ({rooms?.length})
                    </p>
                    <div
                      id="Message-container"
                      className="flex h-full w-full overflow-y-scroll hide-scrollbar"
                    >
                      <div className="flex flex-col w-full gap-1">
                        {rooms
                          ?.filter((room) => {
                            if (activeTab === "Groups") return room.is_group;
                            if (activeTab === "People") return !room.is_group;
                            return true;
                          })
                          .map((room) => (
                            <div
                              key={room.id}
                              onClick={() => setActiveRoomId(room.id)}
                              className={`chats-card group last:pb-8 cursor-pointer ${activeRoomId === room.id ? "active" : ""}`}
                            >
                              <div className="flex items-center rounded-2xl p-4 gap-3 group-[.active]:bg-heyhao-card-grey hover:bg-heyhao-card-grey transition-all duration-300">
                                <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden border border-heyhao-border">
                                  {getProfile(room).photo_url ? (
                                    <img
                                      src={getProfile(room).photo_url || ""}
                                      className="w-full h-full object-cover"
                                      alt="photo"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-heyhao-grey text-heyhao-blue text-lg font-semibold">
                                      {(getProfile(room).name || "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col w-full gap-1">
                                  <div className="flex items-center justify-between gap-[6px]">
                                    <p className="font-medium leading-5 max-w-[182px] truncate">
                                      {getProfile(room).name || ""}
                                    </p>
                                    <span className="text-xs text-heyhao-secondary">
                                      {getProfile(room).message?.created_at
                                        ? dayjs().isSame(
                                            getProfile(room).message
                                              ?.created_at,
                                            "minute",
                                          )
                                          ? "Now"
                                          : dayjs(
                                              getProfile(room).message
                                                ?.created_at,
                                            ).format("D MMM")
                                        : ""}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 justify-between">
                                    <div className="w-full max-w-[178px] text-sm text-heyhao-secondary line-clamp-1 mt-1">
                                      <p className="flex items-center gap-1 text-heyhao-secondary group-[.new]:text-heyhao-black group-[.typing]:hidden!">
                                        <span className="truncate">
                                          {room.messages.length > 0 && (
                                            <span className="truncate">
                                              {room.is_group
                                                ? `${getProfile(room).message?.sender?.name}: ${
                                                    getProfile(room).message
                                                      ?.content ||
                                                    "Sent an attachment"
                                                  }`
                                                : `${getProfile(room).message?.content || "Sent an attachment"}`}
                                            </span>
                                          )}
                                        </span>
                                      </p>
                                      <p className="hidden group-[.typing]:flex! text-heyhao-blue truncate">
                                        {getProfile(room).message?.sender
                                          ?.name || ""}
                                        is typing...
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {activeRoomId ? (
          <ActiveRoom roomId={activeRoomId} />
        ) : (
          <main
            id="Main-Content-Container"
            className="relative flex w-full h-full items-center justify-center"
          >
            <div className="ornaments absolute inset-0 overflow-hidden">
              <img
                src="/assets/images/backgrounds/ornament.png"
                className="absolute bottom-0 h-[300px] -left-[270px]"
                alt="ornament"
              />
              <img
                src="/assets/images/backgrounds/ornament.png"
                className="absolute top-0 h-[320px] -right-[249px] rotate-180"
                alt="ornament"
              />
            </div>

            <div className="relative flex flex-col items-center text-center gap-6">
              <img
                src="/assets/images/icons/message-text-blue-transparent-bg.svg"
                className="size-[120px]"
                alt="icon"
              />
              <div>
                <p className="font-semibold text-xl leading-[25px]">
                  No chat to display.
                </p>
                <p className="font-medium leading-5 text-heyhao-secondary mt-2">
                  Tap on a message to view the chat.
                </p>
              </div>
            </div>
          </main>
        )}
      </div>
      {isSearchModalOpen && (
        <div
          id="Search-Modal"
          className="group absolute inset-0 z-50 flex bg-heyhao-black/80 overflow-hidden"
        >
          <div className="w-fit h-[520px] m-auto">
            <form className="group flex flex-col w-[440px] h-fit rounded-3xl p-5 gap-5 mx-auto bg-white">
              <label className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  className="appearance-none outline-none w-full h-6 px-8 text-heyhao-black placeholder:text-heyhao-secondary font-semibold"
                  placeholder="Cari Group atau Pengguna lain"
                />

                {/* Search Icon */}
                {!isSearching && (
                  <span className="absolute left-0 top-0 flex items-center">
                    <img
                      src="/assets/images/icons/search-normal.svg"
                      className="size-6 shrink-0"
                      alt="search"
                    />
                  </span>
                )}

                {/* Clear Button */}
                {isSearching && (
                  <button
                    type="button"
                    onClick={() => setSearchValue("")}
                    className="absolute right-0 top-0 flex"
                  >
                    <img
                      src="/assets/images/icons/close-circle-black-fill.svg"
                      className="size-6 shrink-0"
                      alt="clear"
                    />
                  </button>
                )}
              </label>
              <div
                id="Result"
                className={`flex flex-col gap-5 ${!isSearching ? "hidden" : ""}`}
              >
                <hr className="border-heyhao-border" />
                <div id="Available-Groups" className="flex flex-col gap-4">
                  <p className="text-sm text-heyhao-secondary">
                    Available Groups
                  </p>
                  <a href="#" className="group-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src="/assets/images/photos/bwa.svg"
                          className="flex size-8 shrink-0 rounded-full overflow-hidden object-cover"
                          alt="photo"
                        />
                        <span className="result-title font-medium truncate">
                          Laravel PHP Indonesia
                        </span>
                      </div>
                      <p className="flex items-center rounded-full py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm text-heyhao-blue gap-0.5">
                        VIP
                      </p>
                    </div>
                  </a>
                  <a href="#" className="group-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src="/assets/images/photos/laravel.svg"
                          className="flex size-8 shrink-0 rounded-full overflow-hidden object-cover"
                          alt="photo"
                        />
                        <span className="result-title font-medium truncate">
                          Belajar Bareng Laravel PHP
                        </span>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="group-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src="/assets/images/photos/group.svg"
                          className="flex size-8 shrink-0 rounded-full overflow-hidden object-cover"
                          alt="photo"
                        />
                        <span className="result-title font-medium truncate">
                          Laravel Gurus: Build Better Apps
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div id="Available-Groups" className="flex flex-col gap-4">
                  <p className="text-sm text-heyhao-secondary">
                    Available People
                  </p>
                  <a href="#" className="flex items-center gap-3">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="flex size-8 shrink-0 rounded-full overflow-hidden object-cover"
                      alt="photo"
                    />
                    <span className="result-title font-medium truncate">
                      Laratih Markisa
                    </span>
                  </a>
                  <a href="#" className="flex items-center gap-3">
                    <img
                      src="/assets/images/photos/photo-2.png"
                      className="flex size-8 shrink-0 rounded-full overflow-hidden object-cover"
                      alt="photo"
                    />
                    <span className="result-title font-medium truncate">
                      Meylara A
                    </span>
                  </a>
                  <a href="#" className="flex items-center gap-3">
                    <img
                      src="/assets/images/photos/photo-3.png"
                      className="flex size-8 shrink-0 rounded-full overflow-hidden object-cover"
                      alt="photo"
                    />
                    <span className="result-title font-medium truncate">
                      Talara Vestapend
                    </span>
                  </a>
                </div>
                <a
                  href="discover-result.html"
                  className="rounded-full py-4 px-3 bg-heyhao-blue w-full text-center font-bold text-white"
                >
                  View More Result
                </a>
                <div id="Not-Found" className="flex w-full h-[416px]">
                  <div className="flex flex-col gap-3 m-auto items-center text-center">
                    <img
                      src="/assets/images/icons/message-remove.svg"
                      className="flex size-[52px] shrink-0"
                      alt="icon"
                    />
                    <p className="font-medium text-lg leading-[28px] text-heyhao-secondary">
                      Oh no! It seems like what you're <br />
                      looking for isn't found.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
