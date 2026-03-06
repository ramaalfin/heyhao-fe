import PusherJs from "pusher-js";

export const pusher = new PusherJs(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: "ap1",
});
