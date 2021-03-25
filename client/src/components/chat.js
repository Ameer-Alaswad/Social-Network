import { useRef, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./chat.css";
import { socket } from "../sockets";
import OnlineUsers from "./onlineUsers";

export default function Chat() {
    const chatMessages = useSelector(
        (state) => state && state.recentChatMessages
    );
    console.log(`chatMessages sdasd asd`, chatMessages);

    const elemRef = useRef();
    function keyCheck(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            console.log(`e.target.value`, e.target.value);
            socket.emit("message", e.target.value);
            e.target.value = "";
        }
    }
    useEffect(() => {
        const newScrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, [chatMessages]);

    return (
        <div className="main-container-chat-component">
            <h1>chat with your friends!</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((userMsg) => {
                        return (
                            <div className="message-container" key={userMsg.id}>
                                <section className="image-user-date-container">
                                    <img
                                        src={
                                            userMsg.image ||
                                            "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png"
                                        }
                                        alt=""
                                    />
                                    <section className="user-date-container">
                                        <h2>
                                            {userMsg.first_name}{" "}
                                            {userMsg.last_name}
                                        </h2>
                                        <p>
                                            {userMsg.time.slice(0, 10)}{" "}
                                            {userMsg.time.slice(11, 16)}
                                        </p>
                                    </section>
                                </section>
                                <h3>{userMsg.message}</h3>
                            </div>
                        );
                    })}
            </div>
            <textarea
                className="text-area-chat"
                name=""
                placeholder="Type a message here"
                onKeyDown={keyCheck}
            ></textarea>
            <h2 className="online-users-title-in-chat">online Users</h2>
            <div className="online-users">
                <OnlineUsers />
            </div>
        </div>
    );
}
