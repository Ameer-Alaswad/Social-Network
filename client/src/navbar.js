import "./navbar.css";
import { BrowserRouter, Link } from "react-router-dom";
import axios from "./axios";
import ProfilePicture from "./components/profilePicture";

export default function Navbar(props) {
    return (
        <nav id="menu">
            <ul id="nav-container">
                <section className="prfile-pic-container-in-app">
                    <li onClick={props.toggleUploader}>
                        <ProfilePicture
                            first={props.first}
                            last={props.last}
                            imageUrl={props.imageUrl}
                            toggleUploader={props.toggleUploader}
                        />
                    </li>
                    <li>
                        <Link to="/friends">Friends</Link>
                    </li>
                    <li>
                        <Link to="/users">Find Friends</Link>
                    </li>
                    <li>
                        <Link to="/">Profile</Link>
                    </li>
                    <li>
                        <Link to="/chat">Chat</Link>
                    </li>
                    <li>
                        <Link to="/online">online users</Link>
                    </li>
                </section>
                <section>
                    <li
                        id="logout-button"
                        onClick={() => {
                            axios.get("/logout").then(() => {
                                window.location.reload();
                            });
                        }}
                    >
                        <a>Logout</a>
                    </li>
                </section>
            </ul>
        </nav>
    );
}
