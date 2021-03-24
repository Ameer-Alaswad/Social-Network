import { chatMessages, chatMessage, onlineUsers } from "./redux/actions";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            store.dispatch(chatMessages(msgs));
        });

        socket.on("message", (msg) => {
            store.dispatch(chatMessage(msg));
        });
        socket.on("onlineUsers", (data) => {
            store.dispatch(onlineUsers(data));
        });
    }
};
