import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function SuccessPayment() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const navigate = useNavigate();

    useEffect(() => {
        if (!orderId) {
            navigate("/home/discover");
        }
    }, [orderId, navigate]);
    return (
        <div className="relative flex justify-center min-h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden pt-[calc(((100vh-832px)/2)+56px)]">
            <img src="assets/images/backgrounds/ornament-payment-success.png" alt="image" className="absolute bottom-0 left-0 w-full" />
            <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden h-screen overflow-x-hidden">
                <div className="relative w-[500px] z-10 p-6 rounded-[32px] bg-[linear-gradient(180deg,_#FFFFFF_65.04%,_rgba(255,_255,_255,_0.5)_100%)] flex flex-col h-fit gap-6 backdrop-blur-md border border-white">
                    <img src="assets/images/icons/polygon-3.svg" alt="icon" className="absolute top-[190px] right-[-22.5px]" />
                    <img src="assets/images/icons/polygon-3.svg" alt="icon" className="absolute top-[190px] left-[-22.5px] rotate-180" />
                    <header className="flex flex-col gap-4">
                        <div className="size-[96px] mx-auto shrink-0 bg-[#30B22D17] rounded-full flex justify-center items-center">
                            <img src="assets/images/icons/checklist-green-fill.svg" alt="icon" className="size-[64px] shrink-0" />
                        </div>
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="font-bold text-[32px] leading-[40px]">Payment Success!</h1>
                            <p className="font-medium leading-5 text-heyhao-secondary">Payment Confirmed, All Good! 😉</p>
                        </div>
                    </header>
                    <div className="box h-[1px] w-full"></div>
                    <div className="flex flex-col gap-6">
                        <section id="Card" className="flex items-center justify-between">
                            <div className="flex items-center gap-[12px]">
                                <div className="flex justify-center items-center size-[64px] shrink-0 rounded-full overflow-hidden">
                                    <img src="assets/images/thumbnails/featured-2.png" alt="image" className="size-full object-cover" />
                                </div>
                                <div className="flex flex-col gap-1 relative z-10">
                                    <h2 className="line-clamp-1 font-semibold text-lg leading-[22.5px]">Indonesia Laravel Creatives</h2>
                                    <div className="flex items-center gap-1">
                                        <img src="assets/images/icons/profile-2user-green.svg" alt="icon" className="size-4 shrink-0" />
                                        <div className="flex gap-1">
                                            <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">57.201</p>
                                            <p className="font-semibold text-sm leading-[17.5px] text-heyhao-green">Members</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center gap-[2px] py-[6px] px-2 bg-[#165DFF17] rounded-full">
                                <img src="assets/images/icons/crown-blue-fill.svg" alt="icon" className="size-4 shrink-0" />
                                <p className="font-bold text-sm leading-[17.5px] text-heyhao-blue">VIP</p>
                            </div>
                        </section>
                        <section id="Payment-Details" className="p-4 rounded-2xl flex flex-col gap-4 border border-heyhao-border">
                            <h3 className="font-semibold text-lg leading-[22.5px]">Payment Details</h3>
                            <div className="flex flex-col gap-[12px]">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">Date</p>
                                    <strong className="font-semibold leading-5">23 Dec 2024</strong>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">Time</p>
                                    <strong className="font-semibold leading-5">09.35 AM</strong>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">Payment Method</p>
                                    <strong className="flex items-center gap-1">
                                        <img src="assets/images/icons/midtrans.svg" alt="icon" className="size-6 shrink-0" />
                                        <p className="font-semibold leading-5 text-[#2F80C1]">Midtrans</p>
                                    </strong>
                                </div>
                                <div className="box h-[1px] w-full"></div>
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-sm leading-[17.5px] text-heyhao-secondary">Total Payment</p>
                                    <strong className="font-semibold text-2xl leading-[30px] text-heyhao-coral">Rp12.500.000</strong>
                                </div>
                            </div>
                        </section>
                        <section id="Buttons" className="flex flex-col gap-4">
                            <a href="message-room-chat-group.html">
                                <div className="rounded-full bg-heyhao-blue py-4 text-white w-full font-bold leading-[20px] text-center">Join Group Now</div>
                            </a>
                            <a href="discover.html">
                                <div className="rounded-full bg-heyhao-black py-4 text-white w-full font-bold leading-[20px] text-center">Discover More Group</div>
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}