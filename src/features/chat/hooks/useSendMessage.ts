import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../api/sendMessage";
import { SendMessagePayload } from "../schema/sendMessageSchema";

export const useSendMessage = (roomId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessage(payload),
    onSuccess: () => {
      // Invalidate the room detail query so messages re-fetch
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
    },
  });

  return {
    sendMessage: mutate,
    isPending,
    error,
  };
};
