import { useRef, useState } from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  sendMessageFormSchema,
  SendMessageFormValues,
  SendMessagePayload,
} from "../schema/sendMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  roomId: string;
}

export default function FormSendMessage({ roomId }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // ✅ preview state

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageFormSchema),
  });

  const { sendMessage, isPending } = useSendMessage(roomId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachedFile(file);

    // ✅ generate object URL for image preview & cleanup old one
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const clearAttachment = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl); // ✅ cleanup memory
    setAttachedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (formValues: SendMessageFormValues) => {
    const payload: SendMessagePayload = {
      message: formValues.message,
      room_id: roomId,
      attach: attachedFile, // ✅ File object passed directly, null if none
    };

    try {
      await sendMessage(payload);
      reset();
      clearAttachment();
    } catch {
      toast.error("Gagal mengirim pesan, silakan coba lagi.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const isImage = attachedFile?.type.startsWith("image/");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute bottom-0 w-full max-w-full p-5 z-20"
    >
      {/* ✅ Image preview before send */}
      {previewUrl && isImage && (
        <div className="mb-2 relative inline-block">
          <img
            src={previewUrl}
            alt="preview"
            className="max-h-40 max-w-[200px] rounded-xl object-cover border border-heyhao-border shadow-sm"
          />
          <button
            type="button"
            onClick={clearAttachment}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center text-xs leading-none hover:bg-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* ✅ Non-image file preview */}
      {attachedFile && !isImage && (
        <div className="mb-2 flex items-center gap-2 px-3 py-2 bg-white rounded-xl ring-1 ring-heyhao-border w-fit max-w-xs">
          <img
            src="/assets/images/icons/gallery-import.svg"
            className="size-4 shrink-0"
            alt=""
          />
          <span className="truncate text-sm text-heyhao-black font-medium">
            {attachedFile.name}
          </span>
          <button
            type="button"
            onClick={clearAttachment}
            className="text-red-400 hover:text-red-600 font-medium text-sm shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      <div className="relative">
        <input
          id="Chat-Input"
          {...register("message")}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="Type a message..."
          className="appearance-none outline-none w-full min-h-[60px] max-h-[200px] h-fit rounded-2xl p-5 pl-4 pr-[112px] bg-white font-medium leading-5 hide-scrollbar focus:ring-2 focus:ring-heyhao-blue transition-all duration-300 text-heyhao-black shadow-sm placeholder:text-heyhao-secondary"
        />

        {errors.message && (
          <p className="absolute -top-6 left-1 text-xs text-red-500">
            {errors.message.message}
          </p>
        )}

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
            className={`size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 transition-all duration-300 ${attachedFile
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
            className={`flex shrink-0 w-11 transition-opacity duration-200 ${isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <img
              src="/assets/images/icons/Send-Button-blue-bg.svg"
              className="object-contain"
              alt="icon"
            />
          </button>
        </div>
      </div>
    </form>
  );
}