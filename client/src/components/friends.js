import { useState, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    getFriends,
    acceptFriend,
    deleteFriend,
    reject,
} from "../redux/actions";
import "./friends.css";

export default function Freinds() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) => state.data && state.data.filter((friend) => friend.accepted)
    );
    const requests = useSelector(
        (state) =>
            state.data &&
            state.data.filter((friend) => friend.accepted == false)
    );
    // const acceptFriend = useSelector(
    //     (state) => state.friendId && state.friendId
    // );
    useEffect(() => {
        dispatch(getFriends());
        // dispatch(updateFreinds());
    }, []);
    return (
        <div className="container">
            <div>
                <h1 className="list">Requests</h1>
                {requests &&
                    requests.map((request) => {
                        return (
                            <div
                                key={request.id}
                                className="image-info-in-friends"
                            >
                                <Link
                                    className="link-in-friends"
                                    to={`/user/${request.id}`}
                                >
                                    <h3>
                                        {request.first_name} {request.last_name}
                                    </h3>
                                    <img
                                        src={
                                            request.image ||
                                            "https://alumni.crg.eu/sites/default/files/default_images/default-picture_0_0.png"
                                        }
                                        alt=""
                                    />
                                </Link>
                                <button
                                    id="accept-button"
                                    onClick={() => {
                                        console.log("accept");
                                        dispatch(acceptFriend(request.id));
                                    }}
                                >
                                    accept
                                </button>
                                <button
                                    id="reject-button"
                                    onClick={() => {
                                        console.log("reject");
                                        dispatch(reject(request.id));
                                    }}
                                >
                                    reject
                                </button>
                            </div>
                        );
                    })}
            </div>
            <div>
                <h1 className="list">Friends List</h1>
                {friends &&
                    friends.map((friend) => {
                        return (
                            <div
                                key={friend.id}
                                className="image-info-in-friends"
                            >
                                <Link
                                    className="link-in-friends"
                                    to={`/user/${friend.id}`}
                                >
                                    <h3>
                                        {friend.first_name} {friend.last_name}
                                    </h3>
                                    <img
                                        src={
                                            friend.image ||
                                            "https://alumni.crg.eu/sites/default/files/default_images/default-picture_0_0.png"
                                        }
                                        alt=""
                                    />
                                </Link>
                                <button
                                    onClick={() => {
                                        console.log("delete");
                                        dispatch(deleteFriend(friend.id));
                                    }}
                                >
                                    unfriend
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
