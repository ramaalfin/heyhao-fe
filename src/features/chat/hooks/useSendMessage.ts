import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/sendMessage";
import { SendMessagePayload } from "../schema/sendMessageSchema";

export const useSendMessage = (_roomId: string) => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessage(payload),
    // Socket.IO broadcast handles updating the message list for all users
  });

  return {
    sendMessage: mutateAsync,
    isPending,
    error,
  };
};
