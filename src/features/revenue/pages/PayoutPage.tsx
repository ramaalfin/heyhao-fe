import { formatDate } from "../../../shared/utils/formatDate";
import SidebarMenu from "../components/SidebarMenu";
import { useGetPayouts } from "../hooks/useGetPayouts";

export default function PayoutPage() {
    const { data, isLoading, error } = useGetPayouts();

    return (
        <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
            <SidebarMenu />
            <main id="Main-Content-Container" className="relative flex flex-1">
                <div className="flex flex-col flex-1">
                    <div id="Header" className="relative flex w-full h-[93px] shrink-0 border-b border-heyhao-border bg-white p-[30px] gap-[10px]">
                        <h1 className="font-bold text-2xl leading-[30px]">History Payout</h1>
                    </div>
                    <div className="flex flex-1 overflow-hidden">
                        <div id="Content" className="flex flex-col w-full max-w-[836px] shrink-0 overflow-y-scroll hide-scrollbar mx-[30px] py-[30px] gap-4">
                            <div id="History" className="flex flex-col gap-[30px] justify-center">
                                <div id="transactions" className="flex flex-col rounded-3xl border border-heyhao-border bg-white">
                                    <div id="Header-Row" className="flex items-center gap-6 p-6">
                                        <div className="flex items-center w-[275px] shrink-0">
                                            <p className="font-semibold">Payment Details</p>
                                        </div>
                                        <div className="flex items-center w-[155.5px] shrink-0">
                                            <p className="font-semibold">Amount</p>
                                        </div>
                                        <div className="flex items-center w-[155.5px] shrink-0">
                                            <p className="font-semibold">Date</p>
                                        </div>
                                        <div className="flex items-center w-[130px] shrink-0">
                                            <p className="font-semibold">Status</p>
                                        </div>
                                    </div>
                                    {!isLoading && data?.data?.map((item) => (
                                        <div key={item.id} className="user-row flex items-center gap-6 p-6 border-t border-heyhao-border">

                                            <div className="flex items-center w-[275px] shrink-0">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex h-[50px] w-20 shrink-0 overflow-hidden">
                                                        {item.bank_name === "BCA" ? (
                                                            <img src="/assets/images/logos/bca.svg" className="w-full h-full object-contain" alt="icon" />
                                                        ) : item.bank_name === "MANDIRI" ? (
                                                            <img src="/assets/images/logos/mandiri.svg" className="w-full h-full object-contain" alt="icon" />
                                                        ) : (
                                                            <img src="/assets/images/logos/bri.svg" className="w-full h-full object-contain" alt="icon" />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col w-full gap-1">
                                                        <p className="font-semibold max-w-[187px] leading-5 truncate">{item.bank_account_number}</p>
                                                        <p className="flex items-center font-medium text-sm text-heyhao-secondary">
                                                            {item.bank_account_name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center w-[155.5px] shrink-0">
                                                <p className="font-bold leading-5 text-heyhao-coral">Rp{item.amount.toLocaleString("id-ID")}</p>
                                            </div>
                                            <div className="flex items-center w-[155.5px] shrink-0">
                                                <p className="font-semibold leading-5">{formatDate(item.created_at)}</p>
                                            </div>
                                            <div className="flex items-center w-[130px] shrink-0">
                                                <p className={`rounded-[50px] py-4 px-6 w-[130px] text-center font-bold leading-5 text-white ${item.status === "PENDING" ? "bg-heyhao-yellow" : item.status === "SUCCESS" ? "bg-heyhao-green" : "bg-heyhao-red"}`}>
                                                    {item.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex items-center justify-center">
                                            <p className="font-semibold">Loading...</p>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="flex flex-col items-center justify-center w-full h-[500px] border-t border-heyhao-border gap-6">
                                            <img src="/assets/images/icons/card-remove-2-grey.svg" className="flex size-[52px] shrink-0" alt="icon" />
                                            <p className="font-medium text-lg text-heyhao-secondary text-center">
                                                Seems like you’ve never done <br />
                                                a withdrawal before!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <section id="Pagination" className="mx-auto mt-[14px]">
                                <ul className="flex items-center gap-4">
                                    <div id="Step-Before" className="group nonactive shrink-0">
                                        <button type="button" id="Step-Before-Active" className="group-[&.nonactive]:hidden group-[&.active]:block p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0">
                                            <img src="/assets/images/icons/arrow-left.svg" alt="icon" className="size-6" />
                                        </button>
                                        <button disabled type="button" id="Step-Before-Nonactive" className="group-[&.nonactive]:block group-[&.active]:hidden p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0">
                                            <img src="/assets/images/icons/arrow-left-nonactive.svg" alt="icon" className="size-6" />
                                        </button>
                                    </div>
                                    <div id="Steps" className="flex items-center gap-4">
                                        <li className="group active">
                                            <a href="">
                                                <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                                                    <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">1</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="group">
                                            <a href="">
                                                <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                                                    <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">2</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="group">
                                            <a href="">
                                                <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                                                    <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">3</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="group">
                                            <a href="">
                                                <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                                                    <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">4</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="group">
                                            <a href="">
                                                <div className="size-[44px] flex items-center justify-center rounded-xl border border-heyhao-border bg-white shrink-0 group-hover:bg-[#165DFF17] group-[&.active]:bg-[#165DFF17] group-hover:border-[#165DFF17] group-[&.active]:border-[#165DFF17] transition-all duration-300">
                                                    <p className="font-semibold leading-[20px] transition-all duration-300 group-hover:text-heyhao-blue group-[&.active]:text-heyhao-blue">5</p>
                                                </div>
                                            </a>
                                        </li>
                                    </div>
                                    <div id="Step-After" className="group active shrink-0">
                                        <button type="button" id="Step-After-Active" className="group-[&.nonactive]:hidden group-[&.active]:block p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0">
                                            <img src="/assets/images/icons/arrow-left.svg" alt="icon" className="size-6 rotate-180" />
                                        </button>
                                        <button disabled type="button" id="Step-After-Nonactive" className="group-[&.nonactive]:block group-[&.active]:hidden p-[10px] rounded-xl border border-heyhao-border bg-white shrink-0">
                                            <img src="/assets/images/icons/arrow-left-nonactive.svg" alt="icon" className="size-6 rotate-180" />
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