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
    return state;
}
