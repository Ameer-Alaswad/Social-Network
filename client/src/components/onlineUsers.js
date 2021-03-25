import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./onlineUsers.css";
import { Link } from "react-router-dom";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state && state.onlineUsers);
    console.log(`online`, onlineUsers);
    return (
        <>
            {onlineUsers &&
                onlineUsers.map((onlineUser) => {
                    return (
                        <Link
                            to={`/user/${onlineUser.id}`}
                            key={onlineUser.id}
                            className="link-in-online-users"
                        >
                            <div className="online-user-container">
                                <img src={onlineUser.image} alt="" />
                                <h1>
                                    {onlineUser.first_name}{" "}
                                    {onlineUser.last_name}
                                </h1>
                            </div>
                        </Link>
                    );
                })}
        </>
    );
}
