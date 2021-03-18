import { useState, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default function FriendsButton(props) {
    const [buttonTxt, setButtonTxt] = useState("send friend request");
    let { otherUserId } = props;
    useEffect(() => {
        axios
            .get(`/friend/status/${otherUserId}`, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            })
            .then((response) => {
                console.log(`response.data.userId`, response.data.userId);
                let { userId } = response.data;
                console.log(`response.data.rows`, response.data.rows);
                if (response.data.rows.length == 0) {
                    setButtonTxt("send friend request");
                } else if (response.data.rows[0].accepted == true) {
                    setButtonTxt("End friendship");
                } else if (response.data.rows[0].sender_id == userId) {
                    setButtonTxt("cancel request");
                } else {
                    setButtonTxt("Accept friendship request");
                }
            });
    }, []);
    function handleClick() {
        if (buttonTxt == "send friend request") {
            axios
                .post("/friend-addFriend", props, {
                    xsrfCookieName: "mytoken",
                    xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
                })
                .then(() => {
                    setButtonTxt("cancel request");
                })
                .catch((err) => console.log(`err in axios add friend`, err));
        } else if (buttonTxt == "cancel request") {
            axios
                .post("/friend-cancelRequest", props, {
                    xsrfCookieName: "mytoken",
                    xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
                })
                .then(() => {
                    setButtonTxt("send friend request");
                })
                .catch((err) => console.log(`err in axios cancelRequest`, err));
        } else if (buttonTxt == "Accept friendship request") {
            axios
                .post("/friend-acceptFriendship", props, {
                    xsrfCookieName: "mytoken",
                    xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
                })
                .then(() => {
                    setButtonTxt("End Friendship");
                })
                .catch((err) =>
                    console.log(`err in axios accept friendship`, err)
                );
        } else {
            axios
                .post("/friend-endFriendship", props, {
                    xsrfCookieName: "mytoken",
                    xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
                })
                .then(() => {
                    setButtonTxt("send friend request");
                })
                .catch((err) =>
                    console.log(`err in axios end friendship`, err)
                );
        }
    }

    return <button onClick={handleClick}>{buttonTxt}</button>;
}
