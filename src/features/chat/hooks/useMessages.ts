import { useEffect, useState } from "react";
import socketClient, { MessageNewData } from "../../../shared/utils/socket";

export type RealtimeMessage = MessageNewData;

export const useMessages = (roomId: string | null) => {
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);

  // Clear messages when room changes
  useEffect(() => {
    setMessages([]);
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const handleNewMessage = (message: RealtimeMessage) => {
      if (message.roomId === roomId) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === message.id)) return prev;
          return [...prev, message];
        });
      }
    };

    socketClient.onMessage(handleNewMessage);

    return () => {
      socketClient.offMessage(handleNewMessage);
    };
  }, [roomId]);

  return { messages };
};
