import { useEffect, useState, useCallback, useRef } from "react";
import socketClient from "../../../shared/utils/socket";

interface TypingUser {
  id: string;
  name: string;
}

export const useTypingIndicator = (roomId: string | null) => {
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const handleUserTyping = (data: {
      roomId: string;
      user: TypingUser;
      isTyping: boolean;
    }) => {
      if (data.roomId !== roomId) return;

      setTypingUsers((prev) => {
        if (data.isTyping) {
          // Add user if not already in list
          if (!prev.find((u) => u.id === data.user.id)) {
            return [...prev, data.user];
          }
          return prev;
        } else {
          // Remove user from list
          return prev.filter((u) => u.id !== data.user.id);
        }
      });
    };

    socketClient.onUserTyping(handleUserTyping);

    return () => {
      socketClient.offUserTyping(handleUserTyping);
    };
  }, [roomId]);

  const startTyping = useCallback(() => {
    if (!roomId) return;

    socketClient.startTyping(roomId);

    // Auto-stop typing after 3 seconds of inactivity
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socketClient.stopTyping(roomId);
    }, 3000) as unknown as number;
  }, [roomId]);

  const stopTyping = useCallback(() => {
    if (!roomId) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    socketClient.stopTyping(roomId);
  }, [roomId]);

  return {
    typingUsers,
    startTyping,
    stopTyping,
  };
};
