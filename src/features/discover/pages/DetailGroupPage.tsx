import { useParams, Link } from "react-router";
import { useDetailGroup } from "../hooks/useDetailGroup";
import { useJoinFreeGroup } from "../hooks/useJoinFreeGroup";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { toast } from "react-toastify";

export default function DetailGroupPage() {
    const { id } = useParams<{ id: string }>();

    const { data: group, isLoading, error } = useDetailGroup(id || "");
    const { mutateAsync: mutateJoinFree, isPending: isPendingFree } = useJoinFreeGroup();
    const { mutateAsync: handleCreateTx, isPending: isPendingTransaction } = useCreateTransaction();

    const handleJoinFreeGroup = async () => {
        try {
            const response = await mutateJoinFree(id || "");
            if (response.data) {
                toast(response.message || "Successfully joined group!", {
                    type: "success",
                });
            }
        } catch (error: any) {
            toast(error?.response?.data?.message || "Failed to join group.", {
                type: "error",
            });
        }
    };

    const handleJoinPaidGroup = async () => {
        try {
            const response = await handleCreateTx(id || "");
            if (response.data?.redirect_url) {
                toast(response.message || "Successfully joined group!", {
                    type: "success",
                });
                window.location.href = response.data.redirect_url;
            }
        } catch (error: any) {
            toast(error?.response?.data?.message || "Failed to create transaction.", {
                type: "error",
            });
        }
    };

    if (isLoading) {
        return (
            <main id="Main-Content-Container" className="relative flex flex-1 flex-col bg-white overflow-y-auto w-full items-center justify-center min-h-screen">
                <p>Loading...</p>
            </main>
        );
    }

    if (error || !group) {
        return (
            <main id="Main-Content-Container" className="relative flex flex-1 flex-col bg-white overflow-y-auto w-full items-center justify-center min-h-screen">
                <p>Failed to load group details.</p>
            </main>
        );
    }

    const {
        name,
        about,
        type,
        photo_url,
        assets,
        room,
        is_join
    } = group;

    const memberCount = room?._count?.members || 0;
    const ownerName = room?.members?.[0]?.user?.name || "Unknown";
    const ownerPhoto = room?.members?.[0]?.user?.photo_url || "/assets/images/photos/photo-1.png";

    return (
        <main id="Main-Content-Container" className="relative flex flex-1 flex-col bg-white overflow-y-auto">
            <section id="Nav-Top" className="relative w-full p-[30px] bg-white border-b border-heyhao-border flex items-center justify-between z-10 sticky top-0">
                <header className="flex flex-col gap-[12px]">
                    <h1 className="font-bold text-2xl leading-[30px]">Group Details Overview</h1>
                    <nav>
                        <ol className="flex items-center gap-1 leading-5 text-heyhao-secondary">
                            <li>
                                <Link to="/home/discover" className="hover:underline">Discover Groups</Link>
                            </li>
                            <li>/</li>
                            <li>
                                <span className="font-medium leading-5 text-heyhao-blue">Group Profile</span>
                            </li>
                        </ol>
                    </nav>
                </header>
                <ul className="flex items-center gap-5">
                    <li className="shrink-0">
                        <Link to="#">
                            <div className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center border border-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                                <img src="/assets/images/icons/like.svg" className="size-6" alt="icon" />
                            </div>
                        </Link>
                    </li>
                    <li className="shrink-0">
                        <Link to="#">
                            <div className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center border border-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                                <img src="/assets/images/icons/dislike.svg" className="size-6" alt="icon" />
                            </div>
                        </Link>
                    </li>
                    <li className="shrink-0">
                        <Link to="#">
                            <div className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center border border-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                                <img src="/assets/images/icons/flag-2.svg" className="size-6" alt="icon" />
                            </div>
                        </Link>
                    </li>
                    <li className="shrink-0">
                        <Link to="#">
                            <div className="size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center border border-heyhao-border hover:ring-1 hover:ring-heyhao-blue transition-all duration-300">
                                <img src="/assets/images/icons/link.svg" className="size-6" alt="icon" />
                            </div>
                        </Link>
                    </li>
                </ul>
            </section>
            <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <div className="w-full flex min-h-[calc(100vh-123px)]">
                    <div className="p-[30px] bg-white flex flex-col gap-[30px] w-full max-w-[calc(100%-560px)]">
                        <section id="Group-Name" className="flex flex-col gap-[12px]">
                            <h2 className="font-semibold leading-5">Group Name</h2>
                            <div className="flex items-center justify-between p-4 border border-heyhao-border rounded-2xl">
                                <div className="flex items-center gap-[12px]">
                                    <div className="flex justify-center items-center size-[64px] shrink-0 rounded-full overflow-hidden">
                                        <img src={`${import.meta.env.VITE_API_URL}/images/${photo_url}`} alt="thumbnail" className="size-full object-cover" />
                                    </div>
                                    <div className="flex flex-col gap-1 relative z-10">
                                        <h3 className="line-clamp-1 font-semibold text-lg leading-[22.5px]">{name}</h3>
                                        <div className="flex items-center gap-1">
                                            <img src="/assets/images/icons/profile-2user-green.svg" alt="icon" className="size-4 shrink-0" />
                                            <div className="flex gap-1">
                                                <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">{memberCount.toLocaleString()}</p>
                                                <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">Members</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {type === "PAID" && (
                                    <div className="shrink-0 flex items-center gap-[2px] py-[6px] px-2 bg-[#165DFF17] rounded-full">
                                        <img src="/assets/images/icons/crown-blue-fill.svg" alt="icon" className="size-4 shrink-0" />
                                        <p className="font-bold text-sm leading-[17.5px] text-heyhao-blue">VIP</p>
                                    </div>
                                )}
                            </div>
                        </section>
                        <section id="About-Group" className="flex flex-col gap-[12px]">
                            <h2 className="font-semibold leading-5">About Group</h2>
                            <p className="font-medium leading-[32px] text-heyhao-secondary">{about || "No description provided."}</p>
                        </section>
                        <section id="Group-Owner" className="flex flex-col gap-[12px]">
                            <h2 className="font-semibold leading-5">Group Owner</h2>
                            <div className="group flex items-center border border-heyhao-border p-4 rounded-2xl justify-between">
                                <div className="flex items-center gap-[12px]">
                                    <div className="flex items-center shrink-0 justify-center size-[50px] rounded-full overflow-hidden">
                                        <img src={`${import.meta.env.VITE_API_URL}/images/${ownerPhoto}`} onError={(e) => { e.currentTarget.src = "/assets/images/photos/photo-1.png"; }} alt="owner" className="size-full object-cover" />
                                    </div>
                                    <div className="flex flex-col gap-[6px]">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <img src="/assets/images/icons/owner-badge-blue-fill.svg" alt="icon" className="shrink-0 size-5" />
                                                <h3 className="font-semibold leading-5">{ownerName}</h3>
                                            </div>
                                            <span id="Online" className="flex text-heyhao-green items-center gap-1 font-semibold text-sm leading-[17.5px]">
                                                <p>•</p>
                                                <p>Online</p>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-[2px] font-medium text-sm leading-[17.5px] text-heyhao-secondary">
                                            <p>Member Since:</p>
                                            <img src="/assets/images/icons/calendar-2.svg" alt="icon" className="size-4 shrink-0" />
                                            <p>Recently</p>
                                        </div>
                                    </div>
                                </div>
                                <Link to="#" className="shrink-0">
                                    <div className="flex items-center gap-[2px] py-[14px] px-4 rounded-xl bg-[#165DFF17] backdrop-blur-sm">
                                        <img src="/assets/images/icons/messages-2-blue.svg" alt="icon" className="size-4 shrink-0" />
                                        <p className="font-semibold text-sm leading-[17.5px] text-heyhao-blue">Message</p>
                                    </div>
                                </Link>
                            </div>
                        </section>

                        {assets && assets.length > 0 && (
                            <section id="Group-Media" className="flex flex-col gap-[12px]">
                                <h2 className="font-semibold leading-5">Group Media</h2>
                                <div className="flex flex-col gap-4">
                                    {assets.map((asset, index) => {
                                        // A simple check for file extension to show different icons could be added here
                                        const isPdf = asset.filename.endsWith('.pdf');
                                        const isVideo = asset.filename.endsWith('.mp4') || asset.filename.endsWith('.mov');

                                        let iconSrc = "/assets/images/icons/document-text-green-fill.svg";
                                        let bgColor = "bg-[#61C65417]";

                                        if (isPdf) {
                                            iconSrc = "/assets/images/icons/document-text-yellow-fill.svg";
                                            bgColor = "bg-[#F5BE4F17]";
                                        } else if (isVideo) {
                                            iconSrc = "/assets/images/icons/document-text-red-fill.svg";
                                            bgColor = "bg-[#ED6B6017]";
                                        }

                                        return (
                                            <div key={index} className="flex items-center border border-heyhao-border p-4 rounded-2xl justify-between">
                                                <div className="flex items-center gap-[12px]">
                                                    <div className={`size-[44px] shrink-0 ${bgColor} rounded-2xl flex justify-center items-center`}>
                                                        <img src={iconSrc} alt="icon" className="size-6" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <h3 className="font-semibold leading-5">{asset.filename}</h3>
                                                        <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">Media Asset</p>
                                                    </div>
                                                </div>
                                                {type === "PAID" && (
                                                    <p className="font-semibold text-sm leading-[21px] bg-[linear-gradient(97.03deg,_#165DFF_-14.12%,_#30A9EE_114.12%)] bg-clip-text text-transparent">VIP Media</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="w-[560px] shrink-0 bg-heyhao-grey p-[30px] flex flex-col gap-[30px]">
                        <section id="Build-Community" className="relative flex flex-col gap-5 pt-6 px-[30px] rounded-3xl overflow-hidden shrink-0">
                            <img src="/assets/images/backgrounds/ornament-group-profile.png" alt="image" className="absolute top-0 left-0 w-full h-full" />
                            <div className="flex items-center justify-between gap-20 relative z-10">
                                <strong className="font-bold text-[30px] leading-[37.5px]">Build Community For Better Future</strong>
                                <img src="/assets/images/icons/medal-star-black-fill.svg" alt="icon" className="size-[62px] shrink-0" />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-t-3xl bg-white gap-2 relative z-10">
                                <img src="/assets/images/photos/Group Members.png" alt="image" className="w-[156px] shrink-0" />
                                <p className="font-semibold leading-[22.4px]">Over <span className="font-bold text-heyhao-blue">52,600+</span> people already own groups. You’re next!</p>
                            </div>
                        </section>
                        {type === "PAID" ? (
                            <form action="#">
                                <div className="p-6 rounded-3xl bg-white flex flex-col gap-6">
                                    <section id="Benefit-Group" className="flex flex-col gap-[12px]">
                                        <h2 className="font-semibold leading-5">Benefit Group</h2>
                                        <div className="flex-col flex gap-[12px]">
                                            <div className="flex items-center gap-[6px]">
                                                <img src="/assets/images/icons/checklist-green-fill.svg" alt="icon" className="size-[24px] shrink-0" />
                                                <p className="font-semibold leading-5">Exclusive access to premium community resources and networking opportunities.</p>
                                            </div>
                                            <div className="flex items-center gap-[6px]">
                                                <img src="/assets/images/icons/checklist-green-fill.svg" alt="icon" className="size-[24px] shrink-0" />
                                                <p className="font-semibold leading-5">Ready-to-use code snippets and advanced tutorials for members.</p>
                                            </div>
                                            <div className="flex items-center gap-[6px]">
                                                <img src="/assets/images/icons/checklist-green-fill.svg" alt="icon" className="size-[24px] shrink-0" />
                                                <p className="font-semibold leading-5">Priority support from group administrators and mentors.</p>
                                            </div>
                                        </div>
                                    </section>
                                    <hr className="border-heyhao-border" />
                                    <section id="Group-Price" className="flex flex-col gap-[12px]">
                                        <h2 className="font-semibold leading-5">Group Price</h2>
                                        <div className="flex items-center justify-between">
                                            <input type="text" className="font-semibold text-2xl leading-[30px] text-heyhao-coral focus:outline-none" value={`Rp ${group?.price?.toLocaleString("id-ID")}`} readOnly />
                                            <div className="py-[6px] px-2 rounded-lg bg-heyhao-grey flex items-center gap-[2px]">
                                                <img src="/assets/images/icons/clock-grey-fill.svg" alt="icon" className="size-4 shrink-0" />
                                                <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">LIFETIME</p>
                                            </div>
                                        </div>
                                    </section>
                                    <button onClick={handleJoinPaidGroup} disabled={isPendingTransaction || is_join} type="button" className={`rounded-full py-4 text-white w-full font-bold leading-[20px] text-center ${is_join ? "bg-heyhao-grey text-heyhao-secondary" : "bg-heyhao-blue"}`}>
                                        {is_join ? "Already Joined" : (isPendingTransaction ? "Processing..." : "Pay With Midtrains & Join")}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form action="#">
                                <div className="p-6 rounded-3xl bg-white flex flex-col gap-6">
                                    <section id="Benefit-Group" className="flex flex-col gap-[12px]">
                                        <h2 className="font-semibold leading-5">Benefit Group</h2>
                                        <div className="flex-col flex gap-[12px]">
                                            <div className="flex items-center gap-[6px]">
                                                <img src="/assets/images/icons/checklist-green-fill.svg" alt="icon" className="size-[24px] shrink-0" />
                                                <p className="font-semibold leading-5">Join community learning for free and grow together.</p>
                                            </div>
                                            <div className="flex items-center gap-[6px]">
                                                <img src="/assets/images/icons/checklist-green-fill.svg" alt="icon" className="size-[24px] shrink-0" />
                                                <p className="font-semibold leading-5">Access all public modules and basic source code.</p>
                                            </div>
                                        </div>
                                    </section>
                                    <hr className="border-heyhao-border" />
                                    <button onClick={handleJoinFreeGroup} disabled={isPendingFree || is_join} type="button" className={`rounded-full py-4 text-white w-full font-bold leading-[20px] text-center ${is_join ? "bg-heyhao-grey text-heyhao-secondary" : "bg-heyhao-blue"}`}>
                                        {is_join ? "Already Joined" : (isPendingFree ? "Joining..." : "Join Group for Free")}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}