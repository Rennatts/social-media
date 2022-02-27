import {
    GET_USERS,
    REGISTER,
    CHECK_AUTH,
    SIGNOUT,
    UPDATE,
    DELETE,
    FOLLOW,
    UNFOLLOW,
    USER_ERROR,
    TOGGLE_SUCCESS,
    AUTH,
    GET_FOLLOWERS,
    LIKE_UNLIKE_USER,
    GET_BRANDUSER
} from '../../types/branduserTypes';


const initialState = {
    currentBranduser: null, 
    brandusers:[],
    userError: null,
    userSuccess: false,
    
};


const branduserReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS: 
            return {
            ...state,
            brandusers: action.payload 
            };
        case GET_BRANDUSER: 
            return {
            ...state,
            branduser: action.payload 
            };
        case GET_USERS: 
            return {
            ...state,
            brandusers: action.payload 
            };
        case AUTH:
            return {
                ...state, 
                currentBranduser: action.payload,
                userError: null,
                userSuccess: !state.userSuccess
            };
        case CHECK_AUTH:
            return {
                ...state, 
                currentBranduser: action.payload 
            };
        case SIGNOUT:
            return {
                ...state, 
                branduser: action.payload 
            };
        case REGISTER:
            return {
                ...state,
                userSuccess: !state.userSuccess,
            };
        case UPDATE:
            const jwt = JSON.parse(localStorage.getItem("jwt"));
            const newJwt = {...jwt, branduser: action.payload};
            localStorage.setItem("jwt", JSON.stringify(newJwt));
            return {
                ...state,
                currentBranduser:  {...state.currentBranduser, branduser: action.payload},
                userSuccess: !state.userSuccess,
            };
        case DELETE:
            return {
                ...state, 
                brandusers: state.brandusers.filter((branduser) => { return branduser._id !== action.currentBranduser.branduser._id}),
                currentBranduser: null,
            };
        case LIKE_UNLIKE_USER:
            const newUpdatedBrandusers = Object.values(state.brandusers).filter(
                (branduser) => {
                if (branduser._id === action.payload._id) {
                    branduser.likes = action.payload.likes;
                    return state.brandusers;
                }
                return state.brandusers;
            });
            return {
                ...state,
                branduser: action.payload,
                brandusers: newUpdatedBrandusers
            }
        case FOLLOW:
            return {
                state
            };
        case UNFOLLOW:
            return {
                state
            };
        case USER_ERROR:
            return {
                ...state,
                userError: action.payload 
            };
        case TOGGLE_SUCCESS:
            return {
               ...state, 
               userSuccess: !state.userSuccess,
            };
        case GET_FOLLOWERS:
            return {
                ...state, 
                userSuccess: !state.userSuccess,
                brandusers: action.payload 
            };
        default: 
        return state;
    }
}


export default branduserReducer;