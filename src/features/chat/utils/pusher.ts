import Pusher from "pusher-js";

Pusher.logToConsole = true;

export const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: "ap1",
});
