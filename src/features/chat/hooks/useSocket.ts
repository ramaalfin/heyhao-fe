import { useEffect, useState } from "react";
import socketClient from "../../../shared/utils/socket";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const socket = socketClient.connect();

    if (!socket) {
      return;
    }

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setIsAuthenticated(false);
    };

    const handleAuthenticated = () => {
      setIsAuthenticated(true);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("authenticated", handleAuthenticated);

    // Check initial connection state
    setIsConnected(socket.connected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("authenticated", handleAuthenticated);
    };
  }, []);

  return {
    socket: socketClient.getSocket(),
    isConnected,
    isAuthenticated,
    connect: () => socketClient.connect(),
    disconnect: () => socketClient.disconnect(),
  };
};
