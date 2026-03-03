import { useRef, useState } from "react";
import { useSendMessage } from "../hooks/useSendMessage";

interface FormSendMessageProps {
  roomId: string;
}

export default function FormSendMessage({ roomId }: FormSendMessageProps) {
  const { sendMessage, isPending } = useSendMessage(roomId);
  const messageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = messageRef.current?.innerText.trim() ?? "";
    if (!message && !attachedFile) return;

    sendMessage(
      { message, room_id: roomId, attach: attachedFile },
      {
        onSuccess: () => {
          // Clear the contentEditable div and file selection
          if (messageRef.current) messageRef.current.innerText = "";
          setAttachedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-0 w-full max-w-full p-5 gap-[10px] z-20"
    >
      <div className="relative">
        <div
          id="Chat-Input"
          ref={messageRef}
          contentEditable={!isPending}
          spellCheck={false}
          onKeyDown={handleKeyDown}
          className="appearance-none outline-none w-full min-h-[60px] max-h-[200px] h-fit rounded-2xl p-5 pl-4 pr-[112px] bg-white wrap-break-word font-medium leading-5 hide-scrollbar focus:ring-2 focus:ring-heyhao-blue transition-all duration-300 empty:text-heyhao-secondary empty:before:content-['Type_a_message...'] text-heyhao-black shadow-sm"
        />

        <div className="absolute flex right-2 bottom-2 gap-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            id="File-Attach-Input"
            accept="image/*,video/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Attach button */}
          <button
            type="button"
            id="Upload-Image"
            onClick={() => fileInputRef.current?.click()}
            title={attachedFile ? attachedFile.name : "Attach file"}
            className={`size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 transition-all duration-300 ${
              attachedFile
                ? "ring-heyhao-blue"
                : "ring-heyhao-border hover:ring-heyhao-blue"
            }`}
          >
            <img
              src="/assets/images/icons/gallery-import.svg"
              className="size-6"
              alt="icon"
            />
          </button>

          {/* Send button */}
          <button
            type="submit"
            disabled={isPending}
            className={`flex shrink-0 w-11 transition-opacity duration-200 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <img
              src="/assets/images/icons/Send-Button-blue-bg.svg"
              className="object-contain"
              alt="icon"
            />
          </button>
        </div>
      </div>

      {/* Show attached file name */}
      {attachedFile && (
        <div className="mt-2 flex items-center gap-2 text-sm text-heyhao-secondary">
          <span className="truncate max-w-[200px]">{attachedFile.name}</span>
          <button
            type="button"
            onClick={() => {
              setAttachedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="text-red-400 hover:text-red-600 font-medium"
          >
            ✕
          </button>
        </div>
      )}
    </form>
  );
}
