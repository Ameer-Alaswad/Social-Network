import { useRef, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./chat.css";
import { socket } from "../sockets";

// import { getFriends, acceptFriend, deleteFriend } from "../redux/actions";

export default function Chat() {
    const elemRef = useRef();
    function keyCheck(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            console.log(`e.target.value`, e.target.value);
            socket.emit("message", e.target.value);
            e.target.value = "";
        }
    }

    return (
        <div className="main-container-chat-component">
            <h1>chat with your friends!</h1>
            <div className="chat-container">
                <div className="message-container">
                    <section className="image-user-date-container">
                        <img
                            src="https://alumni.crg.eu/sites/default/files/default_images/default-picture_0_0.png"
                            alt=""
                        />
                        <section className="user-date-container">
                            <h2>ameer alaswad</h2>
                            <p>2/8/1990</p>
                        </section>
                    </section>
                    <h3>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Recusandae numquam libero quae beatae, doloremque
                        quam modi dolore eaque optio excepturi veritatis
                        repellat dolorum facere tempora perferendis dicta labore
                    </h3>
                </div>
                <div className="message-container">
                    <section className="image-user-date-container">
                        <img
                            src="https://alumni.crg.eu/sites/default/files/default_images/default-picture_0_0.png"
                            alt=""
                        />
                        <section className="user-date-container">
                            <h2>ameer alaswad</h2>
                            <p>2/8/1990</p>
                        </section>
                    </section>
                    <h3>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Recusandae numquam libero quae beatae, doloremque
                        quam modi dolore eaque optio excepturi veritatis
                        repellat dolorum facere tempora perferendis dicta labore
                    </h3>
                </div>
                <div className="message-container">
                    <section className="image-user-date-container">
                        <img
                            src="https://alumni.crg.eu/sites/default/files/default_images/default-picture_0_0.png"
                            alt=""
                        />
                        <section className="user-date-container">
                            <h2>ameer alaswad</h2>
                            <p>2/8/1990</p>
                        </section>
                    </section>
                    <h3>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Recusandae numquam libero quae beatae, doloremque
                        quam modi dolore eaque optio excepturi veritatis
                        repellat dolorum facere tempora perferendis dicta labore
                    </h3>
                </div>
                <div className="message-container">
                    <section className="image-user-date-container">
                        <img
                            src="https://alumni.crg.eu/sites/default/files/default_images/default-picture_0_0.png"
                            alt=""
                        />
                        <section className="user-date-container">
                            <h2>ameer alaswad</h2>
                            <p>2/8/1990</p>
                        </section>
                    </section>
                    <h3>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Recusandae numquam libero quae beatae, doloremque
                        quam modi dolore eaque optio excepturi veritatis
                        repellat dolorum facere tempora perferendis dicta labore
                    </h3>
                </div>
            </div>
            <textarea
                className="text-area-chat"
                name=""
                placeholder="Type a message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
