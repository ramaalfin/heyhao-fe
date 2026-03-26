# HeyHao Frontend

React + TypeScript frontend for HeyHao social platform with real-time chat.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS
- **Real-time**: Socket.IO Client
- **HTTP Client**: Axios with interceptors
- **Storage**: react-secure-storage
- **Notifications**: react-toastify
- **Date**: dayjs

## Features

- ✅ User authentication with auto token refresh
- ✅ Real-time chat with Socket.IO
- ✅ Text and image messaging
- ✅ Typing indicators
- ✅ User presence (online/offline)
- ✅ Group management
- ✅ Revenue tracking & payouts
- ✅ Profile management
- ✅ Responsive design

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Environment Variables

```env
# API Configuration
VITE_API_URL="http://localhost:3000/api/v1"
VITE_SOCKET_URL="http://localhost:3000"
```

**Important**: 
- `VITE_API_URL` includes `/api/v1` base path
- `VITE_SOCKET_URL` is separate and does NOT include `/api/v1`

## Project Structure

```
src/
├── features/              # Feature-based modules
│   ├── auth/             # Authentication
│   │   ├── api/          # API calls
│   │   ├── hooks/        # React Query hooks
│   │   ├── pages/        # Auth pages
│   │   └── utils/        # Schemas & helpers
│   ├── chat/             # Real-time chat
│   │   ├── api/          # Chat API calls
│   │   ├── components/   # Chat components
│   │   ├── hooks/        # Socket hooks
│   │   ├── pages/        # Chat pages
│   │   └── schema/       # Zod schemas
│   ├── discover/         # Discover groups
│   ├── group/            # Group management
│   ├── profile/          # User profile
│   └── revenue/          # Revenue & payouts
├── shared/               # Shared utilities
│   ├── components/       # Reusable components
│   └── utils/            # Utilities
│       ├── axios.ts      # Axios instance with interceptors
│       ├── socket.ts     # Socket.IO client singleton
│       └── constant.ts   # Constants
└── App.tsx               # App entry point
```

## Authentication

### Token Management

Access tokens (15min) and refresh tokens (7 days) stored in `secureLocalStorage`:

```typescript
// Storage format
{
  id: string;
  name: string;
  email: string;
  photo: string;
  token: string;        // Access token
  refreshToken: string; // Refresh token
}
```

### Auto Token Refresh

Axios interceptor automatically refreshes expired tokens:

```typescript
// Response interceptor
const newAccessToken = response.headers["x-new-access-token"];
const newRefreshToken = response.headers["x-new-refresh-token"];

if (newAccessToken && newRefreshToken) {
  secureLocalStorage.setItem(AUTH_KEY, {
    ...data,
    token: newAccessToken,
    refreshToken: newRefreshToken,
  });
}
```

### Request Headers

```typescript
// Axios request interceptor
config.headers.Authorization = `JWT ${token}`;
config.headers["X-Refresh-Token"] = refreshToken;
```

## WebSocket Integration

### Socket Client Singleton

```typescript
// src/shared/utils/socket.ts
class SocketClient {
  private socket: SocketType | null = null;
  private authenticated = false;
  private pendingRooms: Set<string> = new Set();
  
  connect(): SocketType | null {
    const token = this.getToken();
    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
    });
    return this.socket;
  }
  
  joinRoom(roomId: string) {
    if (!this.authenticated) {
      this.pendingRooms.add(roomId);
      return;
    }
    this.socket?.emit("join:room", { roomId });
  }
}

export const socketClient = new SocketClient();
```

### React Hooks

#### useSocket

```typescript
const { isConnected, isAuthenticated } = useSocket();
```

Manages socket connection lifecycle and authentication state.

#### useMessages

```typescript
const { messages } = useMessages(roomId);
```

Listens for `message:new` events and manages real-time message list.

#### useTypingIndicator

```typescript
const { typingUsers, startTyping, stopTyping } = useTypingIndicator(roomId);
```

Manages typing indicators for current room.

#### useRoomPresence

```typescript
const { isUserOnline } = useRoomPresence(roomId);
```

Tracks user online/offline status.

### Message Flow

#### Text Messages (WebSocket)

1. User types in `FormSendMessage`
2. `socketClient.sendMessage(roomId, content, "TEXT")`
3. Backend broadcasts to room
4. `useMessages` receives and displays

#### Image Messages (REST + WebSocket)

1. User selects image in `FormSendMessage`
2. Upload via REST API with FormData
3. Backend saves file and broadcasts via Socket.IO
4. Sender sees via `onFileMessageSent` callback
5. Receiver sees via `useMessages` hook

### Room Management

```typescript
// ActiveRoom.tsx
useEffect(() => {
  socketClient.joinRoom(roomId);
  
  return () => {
    socketClient.leaveRoom(roomId);
  };
}, [roomId]);
```

**Race Condition Fix**: Rooms queued if socket not yet authenticated, then joined automatically on `authenticated` event.

## API Integration

### Axios Instance

```typescript
// src/shared/utils/axios.ts
export const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export const instanceApiWithToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});
```

### React Query Hooks

```typescript
// Example: useGetRoomDetail
export const useGetRoomDetail = (roomId: string | null) => {
  const { data: roomDetail, isLoading, error } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomDetail(roomId!),
    enabled: !!roomId,
    select: (data) => data.data.data,
  });

  return { roomDetail, isLoading, error };
};
```

### API Calls

All API calls return standardized response:

```typescript
interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
```

## Components

### Chat Components

#### ActiveRoom

Main chat interface displaying messages, handling send, and managing socket events.

**Key Features**:
- Message deduplication (DB + realtime + local file messages)
- Image preview and gallery modal
- Typing indicators
- User presence
- Date grouping

#### FormSendMessage

Message input with file upload support.

**Key Features**:
- Text message via WebSocket
- File upload via REST API
- Image preview before send
- Typing indicator integration
- Enter key to send

#### ChatPage

Room list with recent messages and search.

### Shared Components

- `LayoutPage` - Main layout wrapper
- `Navbar` - Navigation bar
- `Sidebar` - Side navigation
- `Modal` - Reusable modal
- `Loading` - Loading states

## Styling

### Tailwind Configuration

Custom colors defined in `tailwind.config.js`:

```javascript
colors: {
  'heyhao-blue': '#0066FF',
  'heyhao-green': '#00C853',
  'heyhao-grey': '#F5F6FA',
  'heyhao-black': '#1A1A1A',
  'heyhao-secondary': '#6B7280',
  'heyhao-border': '#E5E7EB',
  'heyhao-coral': '#FF6B6B',
}
```

### Responsive Design

Mobile-first approach with breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Form Validation

### Zod Schemas

```typescript
// Example: sendMessageFormSchema
export const sendMessageFormSchema = z.object({
  message: z.string(),
});

export type SendMessageFormValues = z.infer<typeof sendMessageFormSchema>;
```

### React Hook Form Integration

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<SendMessageFormValues>({
  resolver: zodResolver(sendMessageFormSchema),
});
```

## Development

### Scripts

```bash
# Development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Hot Module Replacement

Vite provides instant HMR for fast development:
- React Fast Refresh for component updates
- CSS hot reload
- Instant server start

## Build & Deployment

### Production Build

```bash
npm run build
```

Output in `dist/` directory.

### Environment Variables

For production, update `.env`:

```env
VITE_API_URL="https://api.heyhao.com/api/v1"
VITE_SOCKET_URL="https://api.heyhao.com"
```

### Deployment Checklist

- [ ] Update API URLs to production
- [ ] Build with `npm run build`
- [ ] Test production build with `npm run preview`
- [ ] Configure CDN for static assets
- [ ] Set up HTTPS
- [ ] Configure CORS on backend
- [ ] Enable error tracking (Sentry, etc.)
- [ ] Set up analytics

## Troubleshooting

### Common Issues

#### 1. Socket Connection Fails

**Symptoms**: `[Socket] Connection error` in console

**Causes**:
- Backend not running
- Wrong `VITE_SOCKET_URL`
- CORS not configured on backend
- Token invalid or expired

**Fix**:
- Verify backend is running on correct port
- Check `VITE_SOCKET_URL` matches backend
- Clear `secureLocalStorage` and re-login

#### 2. Images Not Displaying

**Symptoms**: Broken image icons in chat

**Causes**:
- Backend CORS policy blocking images
- Wrong `URL_ASSET_ATTACH` on backend
- File not uploaded correctly

**Fix**:
- Verify backend has `crossOriginResourcePolicy: "cross-origin"`
- Check browser network tab for 403/404 errors
- Verify file exists in `public/assets/uploads/attach_messages/`

#### 3. Token Refresh Not Working

**Symptoms**: Logged out after 15 minutes

**Causes**:
- Axios interceptor not configured
- Backend not sending new token headers
- `X-Refresh-Token` header not sent

**Fix**:
- Check axios response interceptor is active
- Verify backend sends `X-New-Access-Token` header
- Check request includes `X-Refresh-Token` header

#### 4. Messages Not Sending

**Symptoms**: Message doesn't appear after send

**Causes**:
- Socket not connected
- Not authenticated
- Not in room
- Backend validation error

**Fix**:
- Check console for `[Socket] Connected` and `[Socket] Authenticated`
- Verify `joinRoom` was called
- Check backend logs for errors

### Debug Mode

Enable Socket.IO debug logs:

```javascript
// In browser console
localStorage.debug = 'socket.io-client:*';
```

## Testing

### Manual Testing Checklist

- [ ] Sign up new user
- [ ] Sign in existing user
- [ ] Token auto-refresh after 15 minutes
- [ ] Update profile with photo
- [ ] Create/join group
- [ ] Send text message
- [ ] Send image message
- [ ] Typing indicator shows
- [ ] User presence updates
- [ ] Messages persist after refresh
- [ ] Multiple tabs sync correctly

## Performance

### Optimization Techniques

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format, lazy loading
- **Memoization**: React.memo for expensive components
- **Debouncing**: Typing indicators, search inputs
- **Virtual Scrolling**: For long message lists (future)

### Bundle Size

Monitor with:

```bash
npm run build -- --mode analyze
```

## Security

### Best Practices

- Tokens stored in `secureLocalStorage` (encrypted)
- XSS prevention via React's built-in escaping
- CSRF protection via JWT (no cookies)
- Input validation with Zod schemas
- Secure WebSocket connection (wss:// in production)

### Content Security Policy

Configure in production:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               connect-src 'self' https://api.heyhao.com wss://api.heyhao.com;
               img-src 'self' https://api.heyhao.com data:;">
```

## Documentation

- [WebSocket Chat Integration](./WEBSOCKET_CHAT_INTEGRATION.md)
- [Implementation Complete](./IMPLEMENTATION_COMPLETE.md)

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact the development team.
