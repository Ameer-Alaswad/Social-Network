import axios from "../axios";
export async function getFriends() {
    try {
        const getFriends = await axios.get("/get-friends-and-freind-requests", {
            xsrfCookieName: "mytoken",
            xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
        });
        console.log(`getFriends in action`, getFriends);
        // we can use axios here with await
        return {
            type: "GET_FRIENDS",
            data: getFriends.data,
        };
    } catch (error) {
        console.log(`error`, error);
    }
}
export async function updateFriends() {
    try {
        // we can use axios here with await
        //const {newFriend} = await axios.get('/update-firend')
        await axios.post(
            "/friend-acceptFriendship",
            {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            },
            { otherUserId: id }
        );
        return {
            type: "UPDATE_FRIENDS",
            newFriend: 1,
        };
    } catch (error) {
        console.log(`error`, error);
    }
}
export async function acceptFriend(id) {
    try {
        // we can use axios here with await
        //const {newFriend} = await axios.get('/update-firend')
        await axios.post(
            "/friend-acceptFriendship",
            { otherUserId: id },
            {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            }
        );
        return {
            type: "ACCEPT_FRIEND",
            friendId: id,
        };
    } catch (error) {
        console.log(`error`, error);
    }
}
export async function deleteFriend(id) {
    try {
        // we can use axios here with await
        //const {newFriend} = await axios.get('/update-firend')
        console.log(`in action`);
        await axios.post(
            "/friend-endFriendship",
            { otherUserId: id },
            {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
            }
        );
        return {
            type: "DELETE_FRIEND",
            friendId: id,
        };
    } catch (error) {
        console.log(`error`, error);
    }
}
export async function chatMessages(msgs) {
    return {
        type: "RECENT_CHAT_MESSAGES",
        messages: msgs,
    };
}

export async function chatMessage(msg) {
    console.log(`msg in action`, msg);
    return {
        type: "MESSAGE",
        message: msg,
    };
}
export async function reject(id) {
    console.log("reject id", id);
    await axios.post(
        "/friend-endFriendship",
        {
            otherUserId: id,
        },
        {
            xsrfCookieName: "mytoken",
            xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
        }
    );
    return {
        type: "REJECT",
        friendId: id,
    };
}
export async function onlineUsers(data) {
    console.log(`data in action`, data);
    return {
        type: "ONLINE_USERS",
        data: data,
    };
}

export async function userLeft(user) {
    console.log(`useer in action`, user);
    return {
        type: "USER_LEFT",
        user: user,
    };
}
