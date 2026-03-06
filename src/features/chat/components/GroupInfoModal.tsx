import dayjs from "dayjs";
import { RoomDetailResponseValues } from "../schema/getRoomDetailSchema";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "../../../shared/utils/constant";
import { SignInResponse } from "../../auth/api/signIn";
import { downloadAssets } from "../../../shared/utils/helper";

interface Props {
  onClose: () => void;
  data: RoomDetailResponseValues;
}

export default function GroupInfoModal({ onClose, data }: Props) {
  const auth = secureLocalStorage.getItem(AUTH_KEY) as SignInResponse;
  const group = data.group;

  if (!group) return null;

  const owner = data.members.find((m) => m.role?.role === "OWNER");
  const otherMembers = data.members.filter((m) => m.role?.role !== "OWNER");

  return (
    <div
      id="Info-Modal"
      className="absolute inset-0 z-50 flex bg-heyhao-black/80 overflow-hidden"
    >
      <div className="flex flex-col h-screen ml-auto mr-0 w-[520px] shrink-0 bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-heyhao-border py-6 px-5">
          <p className="font-semibold text-lg">Group Info</p>
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
            <div className="flex size-[120px] rounded-full overflow-hidden border border-heyhao-border">
              {group.photo_url ? (
                <img
                  src={group.photo_url}
                  className="w-full h-full object-cover"
                  alt="photo"
                />
              ) : (
                <div className="w-full h-full bg-heyhao-grey flex flex-col items-center justify-center text-heyhao-blue font-semibold text-4xl">
                  {group.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-[6px]">
                <p className="font-semibold text-lg">{group.name}</p>
                {group.type === "PAID" && (
                  <p className="badge flex items-center gap-0.5 rounded-full w-fit py-[6px] px-2 bg-heyhao-blue/10 font-bold text-sm leading-[17.5px] text-heyhao-blue">
                    <img
                      src="/assets/images/icons/crown-blue-fill.svg"
                      className="flex size-4 shrink-0"
                      alt="icon"
                    />
                    VIP
                  </p>
                )}
              </div>
              <div className="flex items-center gap-[6px] font-semibold text-sm">
                <p className="flex items-center gap-1">
                  <img
                    src="/assets/images/icons/profile-2user-grey.svg"
                    className="flex size-4 shrink-0"
                    alt="icon"
                  />
                  <span className="text-heyhao-secondary">
                    {group.room._count.members} Members
                  </span>
                </p>
                <span className="flex size-1 shrink-0 rounded-full bg-heyhao-secondary"></span>
                <p className="font-semibold text-sm text-heyhao-green">
                  Active
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 h-[72px] w-full">
              <div className="group">
                <button
                  type="button"
                  onClick={onClose}
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
                </button>
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
                    src="/assets/images/icons/logout-grey.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-medium text-sm text-heyhao-secondary">
                    Leave Group
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div id="About" className="flex p-6 gap-3 flex-col">
            <p className="font-semibold leading-5">About Group</p>
            <p className="font-semibold leading-8 text-heyhao-secondary">
              {group.about}
            </p>
          </div>
          {owner && (
            <div id="Group-Owner" className="flex flex-col gap-3 p-6">
              <p className="font-semibold leading-5">Group Owner</p>
              <div className="flex items-center justify-between rounded-2xl ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300 p-4 gap-3">
                <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden border border-heyhao-border">
                  {owner.user.photo_url ? (
                    <img
                      src={owner.user.photo_url}
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-heyhao-grey text-heyhao-blue font-semibold">
                      {(owner.user.name || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-[6px]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/icons/Owner Badge.svg"
                        className="flex size-5 shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold truncate">
                        {owner.user.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex font-medium text-sm text-heyhao-secondary gap-0.5 items-center">
                    <p>Member Since:</p>
                    <img
                      src="/assets/images/icons/calendar-2.svg"
                      className="flex size-4 shrink-0"
                      alt="icon"
                    />
                    <p>{dayjs(owner.joined_at).format("DD MMM YYYY")}</p>
                  </div>
                </div>
                {owner.user.id !== auth?.id && (
                  <button
                    type="button"
                    className="flex items-center rounded-xl py-[14px] px-4 gap-0.5 bg-heyhao-blue/10"
                  >
                    <img
                      src="/assets/images/icons/messages-2-blue.svg"
                      className="flex size-4 shrink-0"
                      alt="icon"
                    />
                    <span className="font-semibold text-sm text-heyhao-blue">
                      Message
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
          {group.assets.length > 0 && (
            <div id="Group-Media" className="flex flex-col gap-3 p-6">
              <p className="font-semibold leading-5">Group Media</p>
              {group.assets.map((asset, index) => {
                // Determine icon based on mock file extension or random
                const icons = [
                  "document-text-opacity-red.svg",
                  "document-text-opacity-yellow.svg",
                  "document-text-opacity-green.svg",
                ];
                const icon = icons[index % icons.length];
                return (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between rounded-2xl ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300 p-4 gap-3"
                  >
                    <img
                      src={`/assets/images/icons/${icon}`}
                      className="flex size-11 shrink-0"
                      alt="icon"
                    />
                    <div className="flex flex-col flex-1 gap-[6px]">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold truncate w-[280px]">
                            {asset.filename.split("/").pop() || "File"}
                          </p>
                        </div>
                      </div>
                      <div className="flex font-medium text-sm text-heyhao-secondary gap-0.5 items-center">
                        <p>Total Size: 40 GB</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        downloadAssets(asset.file_url, asset.filename)
                      }
                      className="flex items-center gap-1"
                    >
                      <img
                        src="/assets/images/icons/receive-square-blue.svg"
                        className="flex size-4 shrink-0"
                        alt="icon"
                      />
                      <span className="font-semibold text-sm text-heyhao-blue">
                        Download
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {group.benefit.length > 0 && (
            <div id="Benefit" className="flex flex-col gap-3 p-6">
              <p className="font-semibold leading-5">Benefit Group</p>
              {group.benefit.map((b, i) => (
                <div key={i} className="flex items-start gap-[6px]">
                  <img
                    src="/assets/images/icons/checklist-green-fill.svg"
                    className="flex size-6 shrink-0 mt-0.5"
                    alt="icon"
                  />
                  <p className="font-semibold leading-[28px]">{b}</p>
                </div>
              ))}
            </div>
          )}
          {otherMembers.length > 0 && (
            <div id="Group-Member" className="flex flex-col gap-3 p-6">
              <p className="font-semibold leading-5">Group Member</p>
              {otherMembers.map((member) => (
                <div
                  key={member.user.id}
                  className="flex items-center justify-between rounded-2xl ring-1 ring-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300 p-4 gap-3"
                >
                  <div className="flex size-[50px] shrink-0 rounded-full overflow-hidden border border-heyhao-border">
                    {member.user.photo_url ? (
                      <img
                        src={member.user.photo_url}
                        className="w-full h-full object-cover"
                        alt="photo"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-heyhao-grey text-heyhao-blue font-semibold">
                        {(member.user.name || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 gap-[6px]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <p className="font-semibold truncate">
                          {member.user.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex font-medium text-sm text-heyhao-secondary gap-0.5 items-center">
                      <p>Member Since:</p>
                      <img
                        src="/assets/images/icons/calendar-2.svg"
                        className="flex size-4 shrink-0"
                        alt="icon"
                      />
                      <p>{dayjs(member.joined_at).format("DD MMM YYYY")}</p>
                    </div>
                  </div>
                  {member.user.id !== auth?.id && (
                    <button
                      type="button"
                      className="flex items-center rounded-xl py-[14px] px-4 gap-0.5 bg-heyhao-blue/10"
                    >
                      <img
                        src="/assets/images/icons/messages-2-blue.svg"
                        className="flex size-4 shrink-0"
                        alt="icon"
                      />
                      <span className="font-semibold text-sm text-heyhao-blue">
                        Message
                      </span>
                    </button>
                  )}
                </div>
              ))}
              {/* Optional load more button (kept from mock)
              <button className="flex items-center justify-between rounded-xl p-4 gap-[6px] bg-heyhao-grey mt-2">
                <img
                  src="/assets/images/icons/add-square-grey.svg"
                  className="flex size-4 shrink-0"
                  alt="icon"
                />
                <p className="w-full font-medium text-sm text-heyhao-secondary text-left">
                  Load More
                </p>
                <img
                  src="/assets/images/icons/arrow-circle-right-grey.svg"
                  className="flex size-4 shrink-0"
                  alt="icon"
                />
              </button>
              */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
