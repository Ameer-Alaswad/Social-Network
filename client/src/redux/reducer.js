export default function reducer(state = {}, action) {
    // series of IF statements....
    if (action.type === "GET_FRIENDS") {
        state = { ...state, data: action.data };
        // update state somehow...
    }

    if (action.type === "ACCEPT_FRIEND") {
        console.log(`state`, state);
        state = {
            ...state,
            data: state.data.map((data) => {
                if (data.id === action.friendId) {
                    return {
                        ...data,
                        accepted: true,
                    };
                } else {
                    return data;
                }
            }),
        };
    }
    if (action.type === "DELETE_FRIEND") {
        state = {
            ...state,
            data: state.data.filter((info) => info.id != action.friendId),
        };
    }
    if (action.type === "REJECT") {
        state = {
            ...state,
            data: state.data.filter((info) => info.id != action.friendId),
        };
    }

    if (action.type === "RECENT_CHAT_MESSAGES") {
        state = {
            ...state,
            recentChatMessages: action.messages,
        };
    }

    if (action.type === "MESSAGE") {
        console.log(`action.message in reducer`, action.message);
        state = {
            ...state,
            recentChatMessages: [...state.recentChatMessages, action.message],
        };
    }
    return state;
}