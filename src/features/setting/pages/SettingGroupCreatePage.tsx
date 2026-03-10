import SidebarMenu from "../components/SidebarMenu";

export default function SettingGroupCreatePage() {
    return (
        <div className="flex h-screen max-h-screen flex-1 bg-heyhao-grey overflow-hidden">
            <SidebarMenu />
            <main id="Main-Content-Container" className="relative flex flex-1">
                <form action="message-group-created.html" className="flex flex-col flex-1 overflow-hidden">
                    <div id="Header" className="flex h-[122px] w-full items-center justify-between border-b border-heyhao-border p-[30px] bg-white">
                        <div className="relative flex flex-col w-full bg-white gap-3">
                            <h1 className="font-bold text-2xl leading-[30px]">Create A New Group</h1>
                            <nav>
                                <ol className="flex items-center gap-1 leading-5 text-heyhao-secondary">
                                    <li>
                                        <a href="settings-general-settings.html" className="hover:underline">Settings</a>
                                    </li>
                                    <li>/</li>
                                    <li>
                                        <a href="settings-my-own-group.html" className="hover:underline">Group Profile</a>
                                    </li>
                                    <li>/</li>
                                    <li>
                                        <span className="font-medium leading-5 text-heyhao-blue">Create Group</span>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <button type="submit" className="flex shrink-0 rounded-full items-center py-4 px-8 gap-2 bg-heyhao-blue">
                            <span className="font-bold leading-5 text-white text-nowrap">Create New Group</span>
                            <img src="/assets/images/icons/checklist-white-fill.svg" className="flex size-6 shrink-0" alt="icon" />
                        </button>
                    </div>
                    <div id="Content" className="flex flex-1 overflow-y-scroll">
                        <div className="flex flex-1 min-h-screen">
                            <div id="Group-Settings" className="flex w-[636px] shrink-0 bg-white">
                                <div className="flex flex-col w-full h-fit shrink-0 p-[30px] gap-[30px] bg-white">
                                    <div id="Photo" className="flex items-center gap-3">
                                        <div className="flex items-center justify-center rounded-full overflow-hidden size-[100px]">
                                            <img id="photo-container" src="/assets/images/photos/group-default.svg" alt="image" className="object-cover size-full" />
                                        </div>
                                        <input id="file-input" type="file" className="absolute opacity-0" />
                                        <button type="button" id="add-photo" className="flex items-center gap-[6px] px-6 py-4 rounded-full bg-heyhao-black">
                                            <p className="font-bold leading-[20px] text-white">Add Group Photo</p>
                                            <img src="/assets/images/icons/import-grey.svg" alt="icon" className="size-6 shrink-0" />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-medium text-sm text-heyhao-secondary">Group Name</p>
                                        <label className="relative group">
                                            <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                                                <img src="/assets/images/icons/clipboard-grey.svg" className="hidden size-6 shrink-0 group-has-placeholder-shown:flex" alt="icon" />
                                                <img src="/assets/images/icons/clipboard-black.svg" className="flex size-6 shrink-0 group-has-placeholder-shown:hidden" alt="icon" />
                                                <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                            </div>
                                            <input type="text" autoComplete="off" name="" id="" placeholder="Enter group name" className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300" />
                                        </label>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-medium text-sm text-heyhao-secondary">About Group</p>
                                        <label className="relative group">
                                            <div className="absolute transform -translate-y-1/2 top-8 left-6 flex gap-4 items-center">
                                                <img src="/assets/images/icons/message-text-grey.svg" className="hidden size-6 shrink-0 group-has-placeholder-shown:flex" alt="icon" />
                                                <img src="/assets/images/icons/message-text-black.svg" className="flex size-6 shrink-0 group-has-placeholder-shown:hidden" alt="icon" />
                                                <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                            </div>
                                            <textarea name="" id="" placeholder="Type descriptions" rows={8} className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 px-6 pl-20 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300"></textarea>
                                        </label>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-medium text-sm text-heyhao-secondary">Group Type</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <label className="relative group flex items-center gap-4 rounded-xl border border-heyhao-border py-5 px-6 hover:border-heyhao-blue has-checked:bg-heyhao-blue/10 has-checked:border-heyhao-blue/10 transition-all duration-300">
                                                <p className="w-full font-semibold text-heyhao-secondary group-has-checked:text-heyhao-blue transition-all duration-300">Free</p>
                                                <input type="radio" name="type" id="free" className="flex size-6 shrink-0" />
                                            </label>
                                            <label className="relative group flex items-center gap-4 rounded-xl border border-heyhao-border py-5 px-6 hover:border-heyhao-blue has-checked:bg-heyhao-blue/10 has-checked:border-heyhao-blue/10 transition-all duration-300">
                                                <img src="/assets/images/icons/crown-grey.svg" className="flex size-6 shrink-0 group-has-checked:hidden" alt="icon" />
                                                <img src="/assets/images/icons/crown-blue.svg" className="hidden size-6 shrink-0 group-has-checked:flex" alt="icon" />
                                                <div className="flex h-6 shrink-0 border border-heyhao-border group-has-checked:border-heyhao-blue/10"></div>
                                                <p className="w-full font-semibold text-heyhao-secondary group-has-checked:text-heyhao-blue transition-all duration-300">VIP</p>
                                                <input type="radio" name="type" id="vip" className="flex size-6 shrink-0" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-medium text-sm text-heyhao-secondary">Group Price</p>
                                        <label className="relative group">
                                            <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                                                <img src="/assets/images/icons/dollar-square-grey.svg" className="hidden size-6 shrink-0 group-has-placeholder-shown:flex" alt="icon" />
                                                <img src="/assets/images/icons/dollar-square-black.svg" className="flex size-6 shrink-0 group-has-placeholder-shown:hidden" alt="icon" />
                                                <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                                <span className="font-semibold group-has-placeholder-shown:text-heyhao-secondary text-heyhao-black">Rp</span>
                                            </div>
                                            <input type="number" disabled autoComplete="off" name="" id="group-price" placeholder="" className="appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 pr-[159px] pl-[110px] gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold focus:valid:ring-heyhao-blue transition-all duration-300 disabled:bg-white" />
                                            <div id="VIP-badge" className="absolute transform -translate-y-1/2 top-1/2 right-4 flex gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-has-enabled:hidden">
                                                <img src="/assets/images/icons/crown-grey-fill.svg" className="flex size-4 shrink-0" alt="icon" />
                                                <p className="font-medium text-sm text-heyhao-secondary">VIP Featured</p>
                                            </div>
                                            <div id="Lifetime-Badge" className="absolute transform -translate-y-1/2 top-1/2 right-4 flex gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-has-disabled:hidden">
                                                <img src="/assets/images/icons/clock-grey-fill.svg" className="flex size-4 shrink-0" alt="icon" />
                                                <p className="font-medium text-sm text-heyhao-secondary">LIFETIME</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div id="Group-Assets-Benefit" className="group/parent disabled-all flex flex-col p-[30px] gap-[30px] w-[560px] shrink-0">
                                <div id="Assets" className="flex flex-col rounded-3xl p-6 gap-3 bg-white">
                                    <p className="font-medium text-sm text-heyhao-secondary">Group Asset</p>
                                    <div id="Input-File-Container" className="flex flex-col gap-3">
                                        <button type="button" disabled className="btn-upload-file group relative disabled:bg-white flex h-16 items-center rounded-xl border border-heyhao-border py-5 px-6 gap-4 transition-all duration-300">
                                            <input disabled type="file" name="" id="" className="file-input absolute opacity-0" />
                                            <img src="/assets/images/icons/document-text-grey.svg" className="flex size-6 shrink-0 group-[.file-uploaded]:hidden" alt="icon" />
                                            <img src="/assets/images/icons/document-text-black.svg" className="hidden size-6 shrink-0 group-[.file-uploaded]:flex" alt="icon" />
                                            <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                            <span className="file-name w-full max-w-[245px] text-left truncate font-semibold leading-5 text-heyhao-secondary group-[.file-uploaded]:text-heyhao-black"> Upload Media </span>
                                            <div id="VIP-badge" className="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-enabled:hidden">
                                                <img src="/assets/images/icons/crown-grey-fill.svg" className="flex size-4 shrink-0" alt="icon" />
                                                <p className="font-medium text-sm text-heyhao-secondary">VIP Featured</p>
                                            </div>
                                            <div className="flex items-center gap-4 group-disabled:hidden">
                                                <div className="import-btn">
                                                    <img src="/assets/images/icons/import-blue.svg" className="flex size-6 shrink-0" alt="icon" />
                                                </div>
                                                <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                                <div className="delete-btn">
                                                    <img src="/assets/images/icons/trash-red.svg" className="flex size-6 shrink-0" alt="icon" />
                                                </div>
                                            </div>
                                        </button>
                                        <button type="button" disabled className="btn-upload-file group relative disabled:bg-white flex h-16 items-center rounded-xl border border-heyhao-border py-5 px-6 gap-4 transition-all duration-300">
                                            <input disabled type="file" name="" id="" className="file-input absolute opacity-0" />
                                            <img src="/assets/images/icons/document-text-grey.svg" className="flex size-6 shrink-0 group-[.file-uploaded]:hidden" alt="icon" />
                                            <img src="/assets/images/icons/document-text-black.svg" className="hidden size-6 shrink-0 group-[.file-uploaded]:flex" alt="icon" />
                                            <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                            <span className="file-name w-full max-w-[245px] text-left truncate font-semibold leading-5 text-heyhao-secondary group-[.file-uploaded]:text-heyhao-black"> Upload Media </span>
                                            <div id="VIP-badge" className="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-enabled:hidden">
                                                <img src="/assets/images/icons/crown-grey-fill.svg" className="flex size-4 shrink-0" alt="icon" />
                                                <p className="font-medium text-sm text-heyhao-secondary">VIP Featured</p>
                                            </div>
                                            <div className="flex items-center gap-4 group-disabled:hidden">
                                                <div className="import-btn">
                                                    <img src="/assets/images/icons/import-blue.svg" className="flex size-6 shrink-0" alt="icon" />
                                                </div>
                                                <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                                <div className="delete-btn">
                                                    <img src="/assets/images/icons/trash-red.svg" className="flex size-6 shrink-0" alt="icon" />
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                    <button type="button" id="Add-More-Media" disabled className="flex group items-center justify-center rounded-xl p-4 gap-0.5 bg-heyhao-blue/10 disabled:bg-heyhao-grey transition-all duration-300">
                                        <span className="font-semibold text-sm text-heyhao-secondary hidden group-disabled:block">VIP Featured</span>
                                        <span className="font-semibold text-sm text-heyhao-blue group-disabled:hidden">Add More Media</span>
                                        <img src="/assets/images/icons/add-circle-blue.svg" className="flex size-4 shrink-0 group-disabled:hidden" alt="icon" />
                                    </button>
                                </div>
                                <div id="Benefits" className="flex flex-col rounded-3xl p-6 gap-3 bg-white">
                                    <p className="font-medium text-sm text-heyhao-secondary">Group Benefit</p>
                                    <div id="Input-Benefit-Container" className="flex flex-col gap-3">
                                        <label className="relative group">
                                            <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                                                <p className="numbering flex size-4 shrink-0 items-center justify-center text-heyhao-black font-semibold text-lg group-has-placeholder-shown:text-heyhao-secondary transition-all duration-300"></p>
                                                <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                            </div>
                                            <input type="text" disabled name="" id="" placeholder="Type Benefit" className="input-benefit appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 pr-[85px] disabled:pr-[171px] pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold disabled:bg-white focus:valid:ring-heyhao-blue transition-all duration-300" />
                                            <div className="absolute transform -translate-y-1/2 top-1/2 right-6 flex items-center gap-4">
                                                <div id="VIP-badge" className="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-has-enabled:hidden">
                                                    <img src="/assets/images/icons/crown-grey-fill.svg" className="flex size-4 shrink-0" alt="icon" />
                                                    <p className="font-medium text-sm text-heyhao-secondary">VIP Featured</p>
                                                </div>
                                                <div className="flex items-center gap-4 group-has-disabled:hidden">
                                                    <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                                    <div className="delete-btn cursor-pointer">
                                                        <img src="/assets/images/icons/close-circle-red.svg" className="flex size-6 shrink-0" alt="icon" />
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="relative group">
                                            <div className="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                                                <p className="numbering flex size-4 shrink-0 items-center justify-center text-heyhao-black font-semibold text-lg group-has-placeholder-shown:text-heyhao-secondary transition-all duration-300"></p>
                                                <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                            </div>
                                            <input type="text" disabled name="" id="" placeholder="Type Benefit" className="input-benefit appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 pr-[85px] disabled:pr-[171px] pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold disabled:bg-white focus:valid:ring-heyhao-blue transition-all duration-300" />
                                            <div className="absolute transform -translate-y-1/2 top-1/2 right-6 flex items-center gap-4">
                                                <div id="VIP-badge" className="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-has-enabled:hidden">
                                                    <img src="/assets/images/icons/crown-grey-fill.svg" className="flex size-4 shrink-0" alt="icon" />
                                                    <p className="font-medium text-sm text-heyhao-secondary">VIP Featured</p>
                                                </div>
                                                <div className="flex items-center gap-4 group-has-disabled:hidden">
                                                    <div className="flex h-6 shrink-0 border border-heyhao-border"></div>
                                                    <div className="delete-btn cursor-pointer">
                                                        <img src="/assets/images/icons/close-circle-red.svg" className="flex size-6 shrink-0" alt="icon" />
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <button type="button" id="Add-More-Benefit" disabled className="flex group items-center justify-center rounded-xl p-4 gap-0.5 bg-heyhao-blue/10 disabled:bg-heyhao-grey transition-all duration-300">
                                        <span className="font-semibold text-sm text-heyhao-secondary hidden group-disabled:block">VIP Featured</span>
                                        <span className="font-semibold text-sm text-heyhao-blue group-disabled:hidden">Add More Benefit</span>
                                        <img src="/assets/images/icons/add-circle-blue.svg" className="flex size-4 shrink-0 group-disabled:hidden" alt="icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}