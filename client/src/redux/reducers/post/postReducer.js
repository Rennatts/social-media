import {
    GET_ALL,
    ADD_POST,
    REMOVE_POST,
    USER_POSTS,
    LIKE_UNLIKE_POST,
    POST_ERROR,
    ADD_DELETE_COMMENT,
    ADD_COMMENT,
    SEARCH_TOPICS,
    THE_MOST_RECENT_POSTS,
    MOST_COMMENTED,
    MOST_LIKED_POSTS,
    GET_POST,
    GET_POSTS_BY_PRODUCTS
} from '../../types/postTypes';



const initialState = {
    posts: [],
    userPosts: [],
    post: []
}

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL:
            return {
                ...state,
                posts: action.payload,
            }
        case USER_POSTS:
            return {
                ...state,
                userPosts: action.payload,
            }
        case GET_POSTS_BY_PRODUCTS:
            return {
                ...state,
                posts: action.payload,
            }
        case GET_POST:
            return {
                ...state, 
                post: action.payload,
            }
        case ADD_POST:
            return {
                ...state,
                posts: action.payload
            }
        case REMOVE_POST:
            const updatedPosts = state.posts.filter(
                (post) => post._id !== action.payload._id);

            const updatedUserPosts = state.userPosts.filter(
                (post) => {
                    if(post.postedBy._id === action.userId){
                        return post._id !== action.payload._id
                    }
                }
            )
            return {
                ...state,
                posts: updatedPosts,
                userPosts: updatedUserPosts,
            };
        case LIKE_UNLIKE_POST:
            const newUpdatedPosts = Object.values(state.posts).filter(
                (post) => {
                if (post === action.payload) {
                    post.likes = action.payload.likes;
                    return state.posts;
                }
                return state.posts;
            });
            const newUserUpdatedPosts = Object.values(state.posts).filter(
                (post) => {
                if (post.postedBy._id === action.userId) {
                    post.likes = action.payload.likes;
                    return state.userPosts;
                }
                return state.userPosts;
            });
            return {
                ...state,
                posts: newUpdatedPosts,
                userPosts: newUserUpdatedPosts
            }
        case ADD_DELETE_COMMENT:
        const afterCommentActionUpdatedPosts  = Object.values(state.posts).filter(
            (post) => {
            console.log(post);
            if (post === action.payload) {
                post.comments = action.payload.comment;
                return state.posts;
            }
            return state.posts;
        });
        const afterCommentActionUserUpdatedPosts = Object.values(state.userPosts).filter(
            (post) => {
            console.log(post);
            if (post.postedBy._id === action.userId) {
                post.comments = action.payload.comments;              
                return state.userPosts;
            }
            return state.userPosts;
        });
        return {
            ...state,
            posts: afterCommentActionUpdatedPosts,
            userPosts: afterCommentActionUserUpdatedPosts 
        };
        case POST_ERROR: 
        return {
           ...state
        };  
        case SEARCH_TOPICS:
        case THE_MOST_RECENT_POSTS:
        case MOST_COMMENTED:
        case MOST_LIKED_POSTS: 
        return {
            ...state,
            posts: action.payload,
        }; 
        default:
            return state;
    }
};



export default postReducer;