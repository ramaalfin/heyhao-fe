import { useEffect, useState } from "react";
import socketClient from "../../../shared/utils/socket";

export const useRoomPresence = (roomId: string | null) => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!roomId) return;

    const handleUserOnline = (data: { userId: string; roomIds: string[] }) => {
      if (data.roomIds.includes(roomId)) {
        setOnlineUsers((prev) => new Set(prev).add(data.userId));
      }
    };

    const handleUserOffline = (data: {
      userId: string;
      lastSeen: string;
      roomIds: string[];
    }) => {
      if (data.roomIds.includes(roomId)) {
        setOnlineUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.userId);
          return newSet;
        });
      }
    };

    socketClient.onUserOnline(handleUserOnline);
    socketClient.onUserOffline(handleUserOffline);

    return () => {
      socketClient.offUserOnline(handleUserOnline);
      socketClient.offUserOffline(handleUserOffline);
    };
  }, [roomId]);

  const isUserOnline = (userId: string): boolean => {
    return onlineUsers.has(userId);
  };

  return {
    onlineUsers: Array.from(onlineUsers),
    isUserOnline,
  };
};
