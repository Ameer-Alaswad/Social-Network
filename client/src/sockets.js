// import { chatMessages, chatMessage } from "./actions";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        // socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));
        socket.emit("cool message", ["andrea", "david", "pete"]);
        socket.on("message", (msg) => {
            console.log("data from server in socket: ", msg);
        });

        // socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
    }
};
