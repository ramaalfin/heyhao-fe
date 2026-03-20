import { useGetRoomDetail } from "../hooks/useGetRoomDetail";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { SignInResponse } from "../../auth/api/signIn";
import dayjs from "dayjs";
import FormSendMessage from "./FormSendMessage";
import { useEffect, useState } from "react";
import { useMessages, RealtimeMessage } from "../hooks/useMessages";
import { useTypingIndicator } from "../hooks/useTypingIndicator";
import { useRoomPresence } from "../hooks/useRoomPresence";
import socketClient from "../../../shared/utils/socket";
import GroupInfoModal from "./GroupInfoModal";
import GalleryModal from "./GalleryModal";
import PersonalInfoModal from "./PersonalInfoModal";

interface ActiveRoomProps {
  roomId: string;
}

export default function ActiveRoom({ roomId }: ActiveRoomProps) {
  const { roomDetail, isLoading, error } = useGetRoomDetail(roomId);
  const auth = secureLocalStorage.getItem(AUTH_KEY) as SignInResponse;
  const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Local file messages sent via REST (so sender sees them immediately)
  const [localFileMessages, setLocalFileMessages] = useState<RealtimeMessage[]>([]);

  // WebSocket hooks
  const { messages: realtimeMessages } = useMessages(roomId);
  const { typingUsers } = useTypingIndicator(roomId);
  const { isUserOnline } = useRoomPresence(roomId);

  // Clear local file messages when room changes
  useEffect(() => {
    setLocalFileMessages([]);
  }, [roomId]);

  // Join room only after socket is authenticated
  useEffect(() => {
    if (!roomId) return;

    // Try joining immediately (will queue if not yet authenticated)
    socketClient.joinRoom(roomId);

    // Also listen for authenticated event to join if it fires after mount
    const socket = socketClient.getSocket();
    const handleAuthenticated = () => {
      socketClient.joinRoom(roomId);
    };
    socket?.on("authenticated", handleAuthenticated);

    return () => {
      socket?.off("authenticated", handleAuthenticated);
      socketClient.leaveRoom(roomId);
    };
  }, [roomId]);

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
    const isOnline = otherMember ? isUserOnline(otherMember.user.id) : false;
    
    return {
      name: otherMember?.user.name || "User",
      photoUrl: otherMember?.user.photo_url || "",
      status: isOnline ? "Online" : "Offline",
      statusColor: isOnline ? "text-heyhao-green" : "text-heyhao-secondary",
      statusBg: isOnline ? "bg-heyhao-green" : "bg-heyhao-secondary",
    };
  };

  const header = getRoomHeader();

  // Unified message type for rendering
  interface NormalizedMessage {
    id?: string;
    content: string;
    type: string;
    content_url?: string | null;
    created_at: string;
    senderId: string;
    senderName: string;
    senderPhoto: string;
  }

  const normalizeDB = (msg: (typeof roomDetail.messages)[0]): NormalizedMessage => ({
    id: msg.id,
    content: msg.content,
    type: msg.type,
    content_url: msg.content_url,
    created_at: msg.created_at,
    senderId: msg.user?.id ?? "",
    senderName: msg.user?.name ?? "Unknown",
    senderPhoto: msg.user?.photo_url ?? "",
  });

  const normalizeRealtime = (msg: RealtimeMessage): NormalizedMessage => ({
    id: msg.id,
    content: msg.content,
    type: msg.type,
    content_url: msg.content_url,
    created_at: msg.created_at,
    senderId: msg.sender.id,
    senderName: msg.sender.name,
    senderPhoto: msg.sender.photo,
  });

  // Combine, normalize, deduplicate, sort
  const allMessages = [
    ...(roomDetail.messages || []).map(normalizeDB),
    ...realtimeMessages.map(normalizeRealtime),
    // File messages sent via REST — fill sender from auth
    ...localFileMessages.map((msg) => ({
      ...normalizeRealtime(msg),
      senderId: msg.sender.id || auth?.id || "",
      senderName: msg.sender.name || auth?.name || "You",
      senderPhoto: msg.sender.photo || auth?.photo || "",
    })),
  ];
  const uniqueMessages = allMessages.filter(
    (msg, index, self) => index === self.findIndex((m) => m.id === msg.id)
  );
  const sortedMessages = uniqueMessages.sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const groupedMessages: { [key: string]: typeof sortedMessages } = {};
  sortedMessages.forEach((msg) => {
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
                  <span className={`font-semibold text-sm ${header.statusColor}`}>
                    {header.status}
                  </span>
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
                  onClick={() => {
                    if (roomDetail?.group) {
                      setIsGroupInfoOpen(true);
                    } else {
                      setIsPersonalInfoOpen(true);
                    }
                  }}
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
                      const isOut = msg.senderId === auth?.id;

                      return (
                        <div className="chat-row mt-5" key={msg.id || index}>
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
                                    {isOut ? "You" : msg.senderName}
                                  </span>
                                </p>
                              </div>
                              <div className="flex size-8 shrink-0 overflow-hidden rounded-full border border-heyhao-border pointer-events-none">
                                {msg.senderPhoto ? (
                                  <img
                                    src={msg.senderPhoto}
                                    className="w-full h-full object-cover"
                                    alt="photo"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-heyhao-grey flex items-center justify-center text-heyhao-blue text-xs font-semibold">
                                    {msg.senderName.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>
                            </div>

                            {msg.type === "IMAGE" && msg.content_url && (
                              <button
                                onClick={() => {
                                  setIsGalleryOpen(true);
                                  setSelectedImage(msg.content_url!);
                                }}
                                className="message-card preview-img relative max-w-[584px]"
                              >
                                <img
                                  src={msg.content_url}
                                  className={`image max-w-[353px] max-h-[214px] overflow-hidden rounded-2xl object-contain ${
                                    isOut ? "rounded-tr-none" : "rounded-tl-none"
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
              
              {/* Typing indicator */}
              {typingUsers.length > 0 && (
                <div className="chat-row mt-5">
                  <div className="group flex flex-col gap-3 message-in items-start">
                    <div className="message-card relative max-w-[584px]">
                      <div className="w-fit rounded-3xl rounded-tl-none py-3 px-4 bg-white">
                        <p className="text-heyhao-blue text-sm">
                          {typingUsers.map((u) => u.name).join(", ")}{" "}
                          {typingUsers.length === 1 ? "is" : "are"} typing...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            <div className="relative flex w-full z-30">
              <FormSendMessage
                roomId={roomId}
                onFileMessageSent={(msg) => {
                  setLocalFileMessages((prev) => {
                    if (prev.some((m) => m.id === msg.id)) return prev;
                    return [...prev, msg];
                  });
                }}
              />
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

      {isPersonalInfoOpen && (
        <PersonalInfoModal
          onClose={() => setIsPersonalInfoOpen(false)}
          userId={
            roomDetail?.members.find((m) => m.user.id !== auth?.id)?.user.id ||
            ""
          }
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
