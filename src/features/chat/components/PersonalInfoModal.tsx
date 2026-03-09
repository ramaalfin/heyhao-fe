import dayjs from "dayjs";
import { useGetProfile } from "../hooks/useGetProfile";

interface Props {
  onClose: () => void;
  userId: string;
}

export default function PersonalInfoModal({ onClose, userId }: Props) {
  const { profile, isLoading } = useGetProfile(userId);

  if (isLoading || !profile) {
    return (
      <div
        id="Info-Modal"
        className="absolute inset-0 z-50 flex bg-heyhao-black/80 overflow-hidden"
      >
        <div className="flex flex-col h-screen ml-auto mr-0 w-[520px] shrink-0 bg-white overflow-hidden items-center justify-center">
          <p className="text-heyhao-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="Info-Modal"
      className="absolute inset-0 z-50 flex bg-heyhao-black/80 overflow-hidden"
    >
      <div className="flex flex-col h-screen ml-auto mr-0 w-[520px] shrink-0 bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-heyhao-border py-6 px-5">
          <p className="font-semibold text-lg">Personal Info</p>
          <div className="group">
            <button
              id="Close-Info"
              className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
              onClick={onClose}
            >
              <img
                src="/assets/images/icons/close-circle-grey.svg"
                className="size-6"
                alt="icon"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-scroll hide-scrollbar">
          <div
            id="Header"
            className="flex flex-col items-center py-8 px-6 gap-4 border-b border-heyhao-border"
          >
            <div className="flex size-[120px] rounded-full overflow-hidden shrink-0 border border-heyhao-border text-center">
              {profile.photo_url ? (
                <img
                  src={`${profile.photo_url}`}
                  className="w-full h-full object-cover"
                  alt="photo"
                />
              ) : (
                <div className="w-full h-full bg-heyhao-grey flex items-center justify-center text-heyhao-blue text-4xl font-semibold">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-[6px]">
              <div className="flex items-center justify-center gap-[6px]">
                <p className="font-semibold text-lg">{profile.name}</p>
                <div className="flex items-center gap-0.5">
                  <span className="flex size-2 shrink-0 rounded-full bg-heyhao-secondary"></span>
                  <p className="font-medium text-sm text-heyhao-secondary">
                    Offline
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 font-semibold text-sm">
                <img
                  src="/assets/images/icons/calendar-2.svg"
                  className="flex size-4 shrink-0"
                  alt="icon"
                />
                <span className="text-heyhao-secondary">Joined:</span>
                <span className="text-heyhao-secondary">
                  {dayjs(profile.created_at).format("DD MMM YYYY")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 h-[72px] w-full">
              <div className="group">
                <a
                  href="#"
                  className="w-full h-full flex flex-col gap-[10px] items-center justify-center bg-white rounded-2xl p-[10px] ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/message-grey.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-medium text-sm text-heyhao-secondary">
                    Message
                  </span>
                </a>
              </div>
              <div className="group">
                <a
                  href="#"
                  className="w-full h-full flex flex-col gap-[10px] items-center justify-center bg-white rounded-2xl p-[10px] ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/heart-grey.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-medium text-sm text-heyhao-secondary">
                    Favorite
                  </span>
                </a>
              </div>
              <div className="group">
                <a
                  href="#"
                  className="w-full h-full flex flex-col gap-[10px] items-center justify-center bg-white rounded-2xl p-[10px] ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300"
                >
                  <img
                    src="/assets/images/icons/user-remove-grey.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-medium text-sm text-heyhao-secondary">
                    Block
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div id="Group-Joined" className="flex flex-col gap-3 p-6">
            <p className="font-semibold leading-5">Joined to Groups</p>
            {profile.groups.length === 0 ? (
              <p className="text-sm text-heyhao-secondary">
                No groups joined yet.
              </p>
            ) : (
              profile.groups.map((group, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300 p-4 gap-3"
                >
                  <div className="flex size-16 shrink-0 rounded-full overflow-hidden border border-heyhao-border bg-white text-center">
                    {group.photo_url ? (
                      <img
                        src={group.photo_url}
                        className="w-full h-full object-cover"
                        alt="photo"
                      />
                    ) : (
                      <div className="w-full h-full bg-heyhao-grey flex items-center justify-center text-heyhao-blue text-2xl font-semibold">
                        {group.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 w-full">
                        <p className="font-semibold text-lg leading-[22.5px] truncate max-w-[190px] xl:max-w-[290px]">
                          {group.name}
                        </p>
                      </div>
                    </div>
                    {group.room?.members?.[0] && (
                      <div className="flex font-medium text-sm text-heyhao-secondary gap-0.5 items-center">
                        <p>Member Since:</p>
                        <img
                          src="/assets/images/icons/calendar-2.svg"
                          className="flex size-4 shrink-0"
                          alt="icon"
                        />
                        <p>
                          {dayjs(group.room.members[0].joined_at).format(
                            "DD MMM YYYY",
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                  <p
                    className={`badge flex items-center justify-center gap-0.5 rounded-full w-[62px] py-[6px] px-2 font-bold text-sm leading-[17.5px] ${group.type === "PAID" ? "bg-heyhao-blue/10 text-heyhao-blue" : "bg-heyhao-grey text-heyhao-secondary"}`}
                  >
                    {group.type === "PAID" && (
                      <img
                        src="/assets/images/icons/crown-blue-fill.svg"
                        className="flex size-4 shrink-0"
                        alt="icon"
                      />
                    )}
                    {group.type === "PAID" ? "VIP" : "Free"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
