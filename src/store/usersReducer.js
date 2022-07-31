const SET_USERS = 'SET_USERS'

export let setUsers = (users) => {
    return (
        {
            type: SET_USERS,
            users: [ ...users ]
        }
    )
}

let initialState = {
    users: []
}

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return (
                {
                    ...state,
                    users: action.users
                }
            )
        }
        default: {
            return (
                {
                    ...state
                }
            )
        }
    }
}

export default usersReducer