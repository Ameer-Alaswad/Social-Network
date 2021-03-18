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
                    setButtonTxt("end friendship");
                } else if (response.data.rows[0].sender_id == userId) {
                    setButtonTxt("cancel request");
                } else {
                    setButtonTxt("accept friendship request");
                }
            });
    }, []);
    function handleClick() {
        console.log(`hi `);
    }

    return <button onClick={handleClick}>{buttonTxt}</button>;
}
