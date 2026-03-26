# WebSocket Chat Integration - Frontend

Complete guide for Socket.IO integration in the HeyHao React frontend.

## Overview

This document covers the frontend implementation of real-time chat using Socket.IO, including connection management, message handling, and React integration.

## Architecture

### Socket Client Singleton

Located at `src/shared/utils/socket.ts`, provides centralized socket management:

```typescript
class SocketClient {
  private socket: SocketType | null = null;
  private authenticated = false;
  private pendingRooms: Set<string> = new Set();
  
  // Connection management
  connect(): SocketType | null
  disconnect(): void
  isConnected(): boolean
  isAuth(): boolean
  
  // Room management
  joinRoom(roomId: string): void
  leaveRoom(roomId: string): void
  
  // Messaging
  sendMessage(roomId: string, content: string, type: "TEXT" | "IMAGE"): boolean
  
  // Typing indicators
  startTyping(roomId: string): void
  stopTyping(roomId: string): void
  
  // Event listeners
  onMessage(callback): void
  offMessage(callback): void
  onUserTyping(callback): void
  onUserOnline(callback): void
  onUserOffline(callback): void
}
```

### React Hooks

#### useSocket

Manages socket connection lifecycle:

```typescript
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const socket = socketClient.connect();
    
    socket?.on("connect", () => setIsConnected(true));
    socket?.on("disconnect", () => {
      setIsConnected(false);
      setIsAuthenticated(false);
    });
    socket?.on("authenticated", () => setIsAuthenticated(true));
    
    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("authenticated");
    };
  }, []);

  return { isConnected, isAuthenticated };
};
```

#### useMessages

Manages real-time message list:

```typescript
export const useMessages = (roomId: string | null) => {
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);

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
    return () => socketClient.offMessage(handleNewMessage);
  }, [roomId]);

  return { messages };
};
```

## Authentication Flow

### Token Retrieval

```typescript
private getToken(): string | null {
  const authData = secureLocalStorage.getItem(AUTH_KEY) as { token: string } | null;
  return authData?.token ?? null;
}
```

### Connection with Auth

```typescript
connect(): SocketType | null {
  const token = this.getToken();
  if (!token) {
    console.warn("[Socket] No auth token, cannot connect");
    return null;
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

  this.socket.on("authenticated", (data) => {
    console.log("[Socket] Authenticated as:", data.userId);
    this.authenticated = true;
    
    // Join pending rooms
    this.pendingRooms.forEach((roomId) => {
      this.socket?.emit("join:room", { roomId });
    });
    this.pendingRooms.clear();
  });

  return this.socket;
}
```

### Error Handling

```typescript
this.socket.on("error", (error) => {
  console.error("[Socket] Error:", error);
  if (error.code === "AUTH_INVALID_TOKEN" || error.code === "AUTH_TOKEN_EXPIRED") {
    secureLocalStorage.removeItem(AUTH_KEY);
    window.location.href = "/sign-in";
  }
});
```

## Room Management

### Joining Rooms with Race Condition Fix

**Problem**: `joinRoom` called before socket authenticated causes failure.

**Solution**: Queue rooms until authentication completes.

```typescript
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
```

### Component Integration

```typescript
// ActiveRoom.tsx
useEffect(() => {
  if (!roomId) return;

  socketClient.joinRoom(roomId);

  const socket = socketClient.getSocket();
  const handleAuthenticated = () => {
    socketClient.joinRoom(roomId);
  };
  socket?.on("authenticated", handleAuthenticated);

  return () => {
    socket?.off("authenticated", handleAuthenticated);
    socketClient.leaveRoom(roomId);
  };
}, [roomId]);
```

## Message Handling

### Text Messages (WebSocket)

```typescript
// FormSendMessage.tsx
const onSubmit = async (formValues: SendMessageFormValues) => {
  const text = formValues.message?.trim();
  if (!text) return;

  const sent = socketClient.sendMessage(roomId, text, "TEXT");
  if (!sent) {
    toast.error("Tidak terhubung ke server. Coba refresh halaman.");
    return;
  }
  reset();
};
```

### Image Messages (REST + WebSocket)

```typescript
// FormSendMessage.tsx
if (attachedFile) {
  const payload: SendMessagePayload = {
    message: formValues.message || "",
    room_id: roomId,
    attach: attachedFile,
  };
  
  try {
    const res = await sendMessage(payload);
    const data = res.data.data;
    
    // Notify parent to add to local state
    if (onFileMessageSent && data) {
      onFileMessageSent({
        id: data.id,
        roomId: data.room_id,
        content: data.content,
        type: "IMAGE",
        content_url: data.content_url ?? undefined,
        sender: { id: "", name: "", photo: "" },
        created_at: data.created_at,
      });
    }
    
    reset();
    clearAttachment();
  } catch {
    toast.error("Gagal mengirim pesan, silakan coba lagi.");
  }
}
```

### Message Deduplication

```typescript
// ActiveRoom.tsx
const allMessages = [
  ...(roomDetail.messages || []).map(normalizeDB),
  ...realtimeMessages.map(normalizeRealtime),
  ...localFileMessages.map((msg) => ({
    ...normalizeRealtime(msg),
    senderId: msg.sender.id || auth?.id || "",
    senderName: msg.sender.name || auth?.name || "You",
    senderPhoto: msg.sender.photo || auth?.photo || "",
  })),
];

const uniqueMessages = allMessages.filter(
  (msg, index, self) => index === self.findIndex((m) => m.id === msg.id)
);

const sortedMessages = uniqueMessages.sort(
  (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
);
```

## Typing Indicators

### Hook Implementation

```typescript
export const useTypingIndicator = (roomId: string | null) => {
  const [typingUsers, setTypingUsers] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    if (!roomId) return;

    const handleUserTyping = (data: { roomId: string; user: { id: string; name: string }; isTyping: boolean }) => {
      if (data.roomId !== roomId) return;

      setTypingUsers((prev) => {
        if (data.isTyping) {
          if (prev.some((u) => u.id === data.user.id)) return prev;
          return [...prev, data.user];
        } else {
          return prev.filter((u) => u.id !== data.user.id);
        }
      });
    };

    socketClient.onUserTyping(handleUserTyping);
    return () => socketClient.offUserTyping(handleUserTyping);
  }, [roomId]);

  const startTyping = () => socketClient.startTyping(roomId!);
  const stopTyping = () => socketClient.stopTyping(roomId!);

  return { typingUsers, startTyping, stopTyping };
};
```

### Component Usage

```typescript
// FormSendMessage.tsx
const { startTyping, stopTyping } = useTypingIndicator(roomId);
const [isTyping, setIsTyping] = useState(false);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  if (value && value.trim().length > 0) {
    if (!isTyping) {
      setIsTyping(true);
      startTyping();
    }
  } else {
    if (isTyping) {
      setIsTyping(false);
      stopTyping();
    }
  }
};

const handleBlur = () => {
  if (isTyping) {
    setIsTyping(false);
    stopTyping();
  }
};
```

### Display

```typescript
// ActiveRoom.tsx
{typingUsers.length > 0 && (
  <div className="chat-row mt-5">
    <div className="group flex flex-col gap-3 message-in items-start">
      <div className="message-card relative max-w-[584px]">
        <div className="w-fit rounded-3xl rounded-tl-none py-3 px-4 bg-white">
          <p className="text-heyhao-blue text-sm">
            {typingUsers.map((u) => u.name).join(", ")}{" "}
            {typingUsers.length === 1 ? "is" : "are"} typing...
          </p>
        </div>
      </div>
    </div>
  </div>
)}
```

## User Presence

### Hook Implementation

```typescript
export const useRoomPresence = (roomId: string | null) => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!roomId) return;

    const handleUserOnline = (data: { userId: string; roomIds: string[] }) => {
      if (data.roomIds.includes(roomId)) {
        setOnlineUsers((prev) => new Set(prev).add(data.userId));
      }
    };

    const handleUserOffline = (data: { userId: string; roomIds: string[] }) => {
      if (data.roomIds.includes(roomId)) {
        setOnlineUsers((prev) => {
          const next = new Set(prev);
          next.delete(data.userId);
          return next;
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

  const isUserOnline = (userId: string) => onlineUsers.has(userId);

  return { isUserOnline, onlineUsers };
};
```

### Component Usage

```typescript
// ActiveRoom.tsx
const { isUserOnline } = useRoomPresence(roomId);

const otherMember = roomDetail.members.find((m) => m.user.id !== auth?.id);
const isOnline = otherMember ? isUserOnline(otherMember.user.id) : false;

return {
  status: isOnline ? "Online" : "Offline",
  statusColor: isOnline ? "text-heyhao-green" : "text-heyhao-secondary",
};
```

## Image Display

### Message Rendering

```typescript
// ActiveRoom.tsx
{msg.type === "IMAGE" && msg.content_url && (
  <button
    onClick={() => {
      setIsGalleryOpen(true);
      setSelectedImage(msg.content_url!);
    }}
    className="message-card preview-img relative max-w-[584px]"
  >
    <img
      src={msg.content_url}
      className={`image max-w-[353px] max-h-[214px] overflow-hidden rounded-2xl object-contain ${
        isOut ? "rounded-tr-none" : "rounded-tl-none"
      }`}
      alt="image"
    />
  </button>
)}
```

### Image Preview Before Send

```typescript
// FormSendMessage.tsx
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] ?? null;
  setAttachedFile(file);
  
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  
  if (file && file.type.startsWith("image/")) {
    setPreviewUrl(URL.createObjectURL(file));
  } else {
    setPreviewUrl(null);
  }
};

// Cleanup on unmount
useEffect(() => {
  return () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };
}, [previewUrl]);
```

### Gallery Modal

```typescript
// GalleryModal.tsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
  <button onClick={onClose} className="absolute top-4 right-4 text-white">
    ✕
  </button>
  <img src={image} alt="Full size" className="max-w-[90vw] max-h-[90vh] object-contain" />
</div>
```

## Error Handling

### Connection Errors

```typescript
socket.on("connect_error", (error) => {
  console.error("[Socket] Connection error:", error.message);
  toast.error("Koneksi terputus. Mencoba menyambung kembali...");
});
```

### Message Send Errors

```typescript
const sent = socketClient.sendMessage(roomId, text, "TEXT");
if (!sent) {
  toast.error("Tidak terhubung ke server. Coba refresh halaman.");
  return;
}
```

### File Upload Errors

```typescript
try {
  const res = await sendMessage(payload);
  // Success
} catch (error) {
  toast.error("Gagal mengirim pesan, silakan coba lagi.");
}
```

## Performance Optimization

### Memoization

```typescript
const normalizedMessages = useMemo(() => {
  const allMessages = [
    ...(roomDetail.messages || []).map(normalizeDB),
    ...realtimeMessages.map(normalizeRealtime),
    ...localFileMessages.map(normalizeLocal),
  ];
  
  return allMessages.filter(
    (msg, index, self) => index === self.findIndex((m) => m.id === msg.id)
  ).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}, [roomDetail.messages, realtimeMessages, localFileMessages]);
```

### Debouncing Typing Indicators

```typescript
const typingTimeoutRef = useRef<NodeJS.Timeout>();

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  
  if (value && value.trim().length > 0) {
    if (!isTyping) {
      setIsTyping(true);
      startTyping();
    }
    
    // Reset timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Auto-stop after 3 seconds of no typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      stopTyping();
    }, 3000);
  }
};
```

## Testing

### Manual Test Checklist

- [ ] Socket connects on chat page load
- [ ] `authenticated` event fires
- [ ] Can join room and see messages
- [ ] Text messages send and appear
- [ ] Image upload works
- [ ] Images display correctly
- [ ] Typing indicator shows
- [ ] User presence updates
- [ ] Messages persist after refresh
- [ ] Multiple tabs sync correctly
- [ ] Reconnects after disconnect

### Debug Console Logs

Enable in browser console:

```javascript
localStorage.debug = 'socket.io-client:*';
```

Expected logs:
```
[Socket] Connected: <socket-id>
[Socket] Authenticated as: <user-id>
[Socket] Joining room: <room-id>
[Socket] Sending message to room: <room-id> <content>
```

## Common Issues

### 1. Socket Not Connecting

**Symptoms**: No `[Socket] Connected` log

**Causes**:
- Backend not running
- Wrong `VITE_SOCKET_URL`
- CORS not configured

**Fix**:
- Verify backend running on correct port
- Check `VITE_SOCKET_URL` in `.env`
- Verify backend CORS allows origin

### 2. Authentication Fails

**Symptoms**: `AUTH_INVALID_TOKEN` error

**Causes**:
- Token expired
- Wrong JWT secret on backend
- Token not in storage

**Fix**:
- Clear storage and re-login
- Verify backend uses `config.jwtSecret`
- Check token exists in `secureLocalStorage`

### 3. Messages Not Appearing

**Symptoms**: Message sent but not displayed

**Causes**:
- Not in socket room
- Deduplication filtering message
- Backend not broadcasting

**Fix**:
- Verify `room:joined` event received
- Check message has unique `id`
- Check backend logs for broadcast

### 4. Images Not Loading

**Symptoms**: Broken image icon

**Causes**:
- Backend CORS blocking
- Wrong `content_url`
- File not uploaded

**Fix**:
- Verify backend `crossOriginResourcePolicy: "cross-origin"`
- Check `content_url` format in network tab
- Verify file exists on backend

## Best Practices

1. **Single Socket Instance**: Use singleton pattern to prevent multiple connections
2. **Cleanup Listeners**: Always remove event listeners in `useEffect` cleanup
3. **Error Boundaries**: Wrap socket components in error boundaries
4. **Reconnection Logic**: Let Socket.IO handle reconnection automatically
5. **Message Deduplication**: Always deduplicate by unique `id`
6. **Type Safety**: Use TypeScript interfaces for all socket events
7. **Loading States**: Show loading indicators during connection
8. **Offline Handling**: Detect and notify user when offline

## References

- [Socket.IO Client API](https://socket.io/docs/v4/client-api/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
