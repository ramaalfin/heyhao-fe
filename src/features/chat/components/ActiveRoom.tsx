import { useGetRoomDetail } from "../hooks/useGetRoomDetail";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { SignInResponse } from "../../auth/api/signIn";
import dayjs from "dayjs";
import FormSendMessage from "./FormSendMessage";
import { useEffect, useState } from "react";
import { pusher } from "../utils/pusher";
import GroupInfoModal from "./GroupInfoModal";
import GalleryModal from "./GalleryModal";

interface ActiveRoomProps {
  roomId: string;
}

export default function ActiveRoom({ roomId }: ActiveRoomProps) {
  const { roomDetail, isLoading, error } = useGetRoomDetail(roomId);
  const auth = secureLocalStorage.getItem(AUTH_KEY) as SignInResponse;
  const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!roomDetail) {
      return;
    }

    const channelName = `chat-room-${roomDetail.id}`;
    const eventName = `chat-room-${roomDetail.id}-event`;

    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, (data: any) => {
      console.log(data);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, [roomDetail]);

  if (isLoading) {
    return (
      <main className="relative flex w-full h-full items-center justify-center">
        <p className="text-heyhao-secondary">Loading...</p>
      </main>
    );
  }

  if (error || !roomDetail) {
    return (
      <main className="relative flex w-full h-full items-center justify-center">
        <p className="text-red-400">Failed to load chat.</p>
      </main>
    );
  }

  const getRoomHeader = () => {
    if (roomDetail.is_group) {
      return {
        name: roomDetail.group?.name || "Group",
        photoUrl: roomDetail.group?.photo_url || "",
        status: `${roomDetail.members.length} members`,
        statusColor: "text-heyhao-secondary",
        statusBg: "bg-heyhao-secondary",
        type: roomDetail.group?.type || "",
        members: roomDetail.members,
      };
    }

    const otherMember = roomDetail.members.find((m) => m.user.id !== auth?.id);
    return {
      name: otherMember?.user.name || "User",
      photoUrl: otherMember?.user.photo_url || "",
      status: "Online",
      statusColor: "text-heyhao-green",
      statusBg: "bg-heyhao-green",
    };
  };

  const header = getRoomHeader();

  const groupedMessages: { [key: string]: typeof roomDetail.messages } = {};
  roomDetail.messages.forEach((msg) => {
    const dateKey = dayjs(msg.created_at).format("YYYY-MM-DD");
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(msg);
  });

  return (
    <>
      <main id="Main-Content-Container" className="relative flex flex-1">
        <div id="Chat-Container" className="flex flex-col flex-1">
          <div
            id="Chat-Navigation"
            className="flex items-center justify-between w-full border-b border-heyhao-border p-5 gap-3 bg-white"
          >
            <div id="Group-Title" className="flex items-center flex-1 gap-3">
              <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden border border-heyhao-border">
                {header.photoUrl ? (
                  <img
                    src={header.photoUrl}
                    className="w-full h-full object-cover"
                    alt="photo"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-heyhao-grey text-heyhao-blue font-semibold text-lg">
                    {header.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-[6px]">
                  <h1 className="font-semibold text-lg leading-[23px]">
                    {header.name}
                  </h1>
                  {header.type === "PAID" && (
                    <p className="rounded-full w-fit py-0.5 px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                      VIP
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-[6px]">
                  <div className="group-member-photos flex items-center w-fit">
                    {header?.members?.slice(0, 3).map((member, index) => (
                      <div
                        key={index}
                        className="relative flex size-6 shrink-0 rounded-full overflow-hidden -ml-[10px] first:ml-0 z-20"
                      >
                        <img
                          src={member.user.photo_url || ""}
                          className="w-full h-full object-cover"
                          alt="photo"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="font-semibold text-sm text-heyhao-secondary">
                    {header?.members?.length} Members
                  </span>
                  <span className="font-semibold text-sm text-heyhao-secondary">
                    •
                  </span>
                  {/* <span className="font-semibold text-sm text-heyhao-green">
                  {
                    header?.members?.filter((member) => member.user.is_online)
                      .length
                  }{" "}
                  Online
                </span> */}
                </div>
              </div>
            </div>
            <ul className="flex gap-3">
              <li className="group">
                <a
                  href="#"
                  className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/video.svg"
                    className="size-6"
                    alt="icon"
                  />
                </a>
              </li>
              <li className="group">
                <a
                  href="#"
                  className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/call.svg"
                    className="size-6"
                    alt="icon"
                  />
                </a>
              </li>
              <li className="group">
                <button
                  onClick={() => setIsGroupInfoOpen(true)}
                  id="Info"
                  className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/more.svg"
                    className="size-6"
                    alt="icon"
                  />
                </button>
              </li>
            </ul>
          </div>
          <div
            id="Chat-Messages"
            className="relative flex flex-col flex-1 overflow-hidden"
          >
            <div className="gradient-background absolute top-0 rotate-180 bg-[linear-gradient(180deg,rgba(245,246,250,0)_0%,rgba(245,246,250,0.8)_100%)] w-full h-[120px] z-10 pointer-events-none"></div>
            <div className="gradient-background absolute bottom-0 bg-[linear-gradient(180deg,rgba(245,246,250,0)_0%,rgba(245,246,250,1)_100%)] w-full h-[120px] z-10 pointer-events-none"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src="/assets/images/backgrounds/chat-Bg.svg"
                className="w-full h-full object-cover"
                alt="bg"
              />
            </div>
            <article className="relative flex-1 flex flex-col gap-5 p-[28px] pb-[130px] pl-5 overflow-y-scroll hide-scrollbar z-20">
              {Object.entries(groupedMessages).map(([date, msgs]) => {
                const isToday = dayjs().isSame(date, "day");
                const isYesterday = dayjs()
                  .subtract(1, "day")
                  .isSame(date, "day");
                let displayDate = dayjs(date).format("DD MMM YYYY");
                if (isToday)
                  displayDate = "Today, " + dayjs(date).format("DD MMM");
                if (isYesterday)
                  displayDate = "Yesterday, " + dayjs(date).format("DD MMM");

                return (
                  <div key={date}>
                    <p className="date sticky w-[150px] text-center top-0 mt-[21px] mx-auto rounded-xl py-[10px] px-3 bg-white font-medium text-sm z-30">
                      {displayDate}
                    </p>
                    {msgs.map((msg, index) => {
                      const isOut = msg.user?.id === auth?.id;

                      return (
                        <div className="chat-row mt-5" key={index}>
                          <div
                            className={`group flex flex-col gap-3 ${
                              isOut
                                ? "message-out items-end"
                                : "message-in items-start"
                            }`}
                          >
                            <div
                              className={`time sender flex items-center gap-3 ${
                                !isOut
                                  ? "group-[&.message-in]:flex-row-reverse"
                                  : ""
                              }`}
                            >
                              <div
                                className={`flex items-center gap-[6px] ${
                                  !isOut
                                    ? "group-[&.message-in]:flex-row-reverse"
                                    : ""
                                }`}
                              >
                                {!isOut && (
                                  <img
                                    src="/assets/images/icons/Send.svg"
                                    className="flex size-6 shrink-0 group-[&.message-in]:hidden"
                                    alt="icon"
                                  />
                                )}
                                <p
                                  className={`flex gap-[6px] text-heyhao-secondary ${
                                    !isOut
                                      ? "group-[&.message-in]:flex-row-reverse"
                                      : ""
                                  }`}
                                >
                                  <span>
                                    {dayjs(msg.created_at).format("hh:mm A")}
                                  </span>
                                  <span> • </span>
                                  <span className="text-heyhao-black">
                                    {isOut
                                      ? "You"
                                      : msg.user?.name || "Unknown"}
                                  </span>
                                </p>
                              </div>
                              <div className="flex size-8 shrink-0 overflow-hidden rounded-full border border-heyhao-border pointer-events-none">
                                {msg.user?.photo_url ? (
                                  <img
                                    src={msg.user.photo_url}
                                    className="w-full h-full object-cover"
                                    alt="photo"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-heyhao-grey flex items-center justify-center text-heyhao-blue text-xs font-semibold">
                                    {(msg.user?.name || "U")
                                      .charAt(0)
                                      .toUpperCase()}
                                  </div>
                                )}
                              </div>
                            </div>

                            {msg.type === "IMAGE" && msg.content_url && (
                              <button
                                onClick={() => {
                                  setIsGalleryOpen(true);
                                  setSelectedImage(msg.content_url || "");
                                }}
                                className="message-card preview-img relative max-w-[584px]"
                              >
                                <img
                                  src={msg.content_url}
                                  className={`image max-w-[353px] max-h-[214px] overflow-hidden rounded-2xl object-contain ${
                                    isOut
                                      ? "rounded-tr-none"
                                      : "rounded-tl-none"
                                  }`}
                                  alt="image"
                                />
                              </button>
                            )}

                            {msg.type !== "IMAGE" && (
                              <div className="message-card relative max-w-[584px]">
                                <div
                                  className={`w-fit rounded-3xl py-5 px-4 gap-2 leading-[28px] ${
                                    isOut
                                      ? "rounded-tr-none bg-white"
                                      : "rounded-tl-none bg-white"
                                  }`}
                                >
                                  <p>{msg.content}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </article>

            <div className="relative flex w-full z-30">
              <FormSendMessage roomId={roomId} />
            </div>
          </div>
        </div>
      </main>

      {isGroupInfoOpen && roomDetail?.group && (
        <GroupInfoModal
          onClose={() => setIsGroupInfoOpen(false)}
          data={roomDetail}
        />
      )}

      {isGalleryOpen && selectedImage && (
        <GalleryModal
          onClose={() => setIsGalleryOpen(false)}
          image={selectedImage}
        />
      )}
    </>
  );
}
