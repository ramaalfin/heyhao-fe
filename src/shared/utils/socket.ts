import { io, Socket } from "socket.io-client";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "./constant";

interface ClientToServerEvents {
  "join:room": (data: { roomId: string }) => void;
  "leave:room": (data: { roomId: string }) => void;
  "message:send": (data: { roomId: string; content: string; type: "TEXT" | "IMAGE" }) => void;
  "typing:start": (data: { roomId: string }) => void;
  "typing:stop": (data: { roomId: string }) => void;
  "message:read": (data: { roomId: string; messageIds: string[] }) => void;
}

export interface MessageNewData {
  id: string;
  roomId: string;
  content: string;
  type: "TEXT" | "IMAGE";
  content_url?: string;
  sender: { id: string; name: string; photo: string };
  created_at: string;
}

interface ServerToClientEvents {
  authenticated: (data: { userId: string; user: { id: string; name: string; email: string; photo: string }; rooms: string[] }) => void;
  "room:joined": (data: { roomId: string; members: Array<{ id: string; name: string; photo: string; online: boolean }> }) => void;
  "room:left": (data: { roomId: string }) => void;
  "message:new": (data: MessageNewData) => void;
  "message:delivered": (data: { messageId: string; roomId: string; timestamp: string }) => void;
  "user:typing": (data: { roomId: string; user: { id: string; name: string }; isTyping: boolean }) => void;
  "user:online": (data: { userId: string; roomIds: string[] }) => void;
  "user:offline": (data: { userId: string; lastSeen: string; roomIds: string[] }) => void;
  error: (data: { code: string; message: string; details?: unknown }) => void;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

class SocketClient {
  private socket: SocketType | null = null;
  private authenticated = false;
  private pendingRooms: Set<string> = new Set();

  private getToken(): string | null {
    const authData = secureLocalStorage.getItem(AUTH_KEY) as { token: string } | null;
    return authData?.token ?? null;
  }

  connect(): SocketType | null {
    const token = this.getToken();
    if (!token) {
      console.warn("[Socket] No auth token, cannot connect");
      return null;
    }

    if (this.socket?.connected && this.authenticated) {
      return this.socket;
    }

    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.authenticated = false;
    }

    this.socket = io(SOCKET_URL, {
      path: "/socket.io",
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", () => {
      console.log("[Socket] Connected:", this.socket?.id);
    });

    this.socket.on("authenticated", (data) => {
      console.log("[Socket] Authenticated as:", data.userId);
      this.authenticated = true;
      // Join any rooms that were requested before auth completed
      this.pendingRooms.forEach((roomId) => {
        console.log("[Socket] Joining pending room:", roomId);
        this.socket?.emit("join:room", { roomId });
      });
      this.pendingRooms.clear();
    });

    this.socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
      this.authenticated = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("[Socket] Connection error:", error.message);
    });

    this.socket.on("error", (error) => {
      console.error("[Socket] Error:", error);
      if (error.code === "AUTH_INVALID_TOKEN" || error.code === "AUTH_TOKEN_EXPIRED") {
        secureLocalStorage.removeItem(AUTH_KEY);
        window.location.href = "/sign-in";
      }
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.authenticated = false;
      this.pendingRooms.clear();
    }
  }

  getSocket(): SocketType | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  isAuth(): boolean {
    return this.authenticated;
  }

  joinRoom(roomId: string) {
    if (!this.socket?.connected) {
      console.warn("[Socket] Not connected, queuing room join:", roomId);
      this.pendingRooms.add(roomId);
      return;
    }
    if (!this.authenticated) {
      console.warn("[Socket] Not authenticated yet, queuing room join:", roomId);
      this.pendingRooms.add(roomId);
      return;
    }
    console.log("[Socket] Joining room:", roomId);
    this.socket.emit("join:room", { roomId });
  }

  leaveRoom(roomId: string) {
    this.pendingRooms.delete(roomId);
    this.socket?.emit("leave:room", { roomId });
  }

  sendMessage(roomId: string, content: string, type: "TEXT" | "IMAGE" = "TEXT"): boolean {
    if (!this.socket?.connected || !this.authenticated) {
      console.warn("[Socket] Not connected/authenticated, cannot send message");
      return false;
    }
    console.log("[Socket] Sending message to room:", roomId, content);
    this.socket.emit("message:send", { roomId, content, type });
    return true;
  }

  startTyping(roomId: string) {
    this.socket?.emit("typing:start", { roomId });
  }

  stopTyping(roomId: string) {
    this.socket?.emit("typing:stop", { roomId });
  }

  onMessage(callback: (data: MessageNewData) => void) {
    this.socket?.on("message:new", callback);
  }

  offMessage(callback: (data: MessageNewData) => void) {
    this.socket?.off("message:new", callback);
  }

  onUserTyping(callback: (data: { roomId: string; user: { id: string; name: string }; isTyping: boolean }) => void) {
    this.socket?.on("user:typing", callback);
  }

  offUserTyping(callback: (data: { roomId: string; user: { id: string; name: string }; isTyping: boolean }) => void) {
    this.socket?.off("user:typing", callback);
  }

  onUserOnline(callback: (data: { userId: string; roomIds: string[] }) => void) {
    this.socket?.on("user:online", callback);
  }

  offUserOnline(callback: (data: { userId: string; roomIds: string[] }) => void) {
    this.socket?.off("user:online", callback);
  }

  onUserOffline(callback: (data: { userId: string; lastSeen: string; roomIds: string[] }) => void) {
    this.socket?.on("user:offline", callback);
  }

  offUserOffline(callback: (data: { userId: string; lastSeen: string; roomIds: string[] }) => void) {
    this.socket?.off("user:offline", callback);
  }

  onRoomJoined(callback: (data: { roomId: string; members: Array<{ id: string; name: string; photo: string; online: boolean }> }) => void) {
    this.socket?.on("room:joined", callback);
  }
}

export const socketClient = new SocketClient();
export default socketClient;
