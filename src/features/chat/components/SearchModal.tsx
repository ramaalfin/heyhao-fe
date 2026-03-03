import { useEffect, useState } from "react";

export default function SearchModal({
  setIsSearchModalOpen,
}: {
  setIsSearchModalOpen: (value: boolean) => void;
}) {
  const [searchValue, setSearchValue] = useState("");

  const isSearching = searchValue.trim().length > 0;

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
              <p className="text-sm text-heyhao-secondary">Available Groups</p>
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
              <p className="text-sm text-heyhao-secondary">Available People</p>
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
  );
}
