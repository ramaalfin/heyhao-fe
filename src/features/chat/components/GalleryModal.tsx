interface Props {
  onClose: () => void;
  image: string;
}

export default function GalleryModal({ onClose, image }: Props) {
  return (
    <div
      id="Gallery-Modal"
      className={`absolute inset-0 z-50 flex bg-heyhao-black/80 overflow-hidden`}
    >
      <div
        id="Image-Container"
        className="flex flex-1 px-[120px] py-[100px] items-center justify-center overflow-hidden"
      >
        <img
          id="Image-Preview"
          src={image}
          className="w-full h-full object-contain"
          alt="image"
        />
        <button
          id="Btn-Close"
          className="preview-img absolute transform -translate-x-1/2 left-1/2 bottom-[30px] flex items-center gap-1  border border-[#D7D7D7]/10 rounded-xl py-2 px-3 overflow-hidden bg-[#A79E9E36]"
          onClick={() => {
            onClose();
          }}
        >
          <img
            src="/assets/images/icons/close-circle-white.svg"
            className="flex shrink-0 size-4"
            alt="icon"
          />
          <span className="font-medium text-sm text-white">Close Image</span>
        </button>
      </div>
    </div>
  );
}
