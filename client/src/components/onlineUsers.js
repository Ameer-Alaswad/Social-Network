import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state && state.onlineUsers);
    console.log(`online`, onlineUsers);
    return (
        <>
            {onlineUsers &&
                onlineUsers.map((onlineUser) => {
                    return (
                        <div key={onlineUser.id}>
                            <img src={onlineUser.image} alt="" />
                            <h1>
                                {onlineUser.first_name} {onlineUser.last_name}
                            </h1>
                        </div>
                    );
                })}
        </>
    );
}
