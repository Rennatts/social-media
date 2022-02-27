import {
    GET_ALL,
    GET_POST,
    ADD_POST,
    REMOVE_POST,
    USER_POSTS,
    LIKE_UNLIKE_POST,
    POST_ERROR,
    ADD_DELETE_COMMENT,
    SEARCH_TOPICS,
    MOST_LIKED_POSTS,
    MOST_COMMENTED,
    THE_MOST_RECENT_POSTS,
    GET_POSTS_BY_PRODUCTS
} from '../types/postTypes';

import axios from 'axios';


export const getAllPosts = (token) => {
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return (dispatch) => {
        axios
        .get("http://localhost:5000/posts/allposts", config)
        .then((res) => {
            dispatch({
                type: GET_ALL,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
    };
};





export const getPostsByUser = (token, userId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return (dispatch) => {
        axios
        .get(`http://localhost:5000/posts/postsby/${userId}`, config)
        .then((res) => {
            dispatch({
                type: USER_POSTS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
    };
};



export const addPost = (token, userId, post) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return (dispatch) => {
        axios
        .post(`http://localhost:5000/posts/create/new/${userId}`, post, config)
        .then((res) => {
            console.log(res);
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
            dispatch(getAllPosts(token));
        })
        .catch((err) => console.log(err));
    };
};



export const likePost = (token, userId, postId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return(dispatch) => {
        axios
        .put(`http://localhost:5000/posts/post/likepost`, {userId, postId}, config)
        .then((res) => {
            dispatch({
                type: LIKE_UNLIKE_POST,
                payload: res.data,
            });
            dispatch(getAllPosts(token));
        })
        .catch((err) => console.log(err));
    };
    
};


export const likeposttwo = (userId, token, postId) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/posts/post/likepost`, {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({userId, postId})
        })
        .then((response) => {
            dispatch({
                type: LIKE_UNLIKE_POST,
                payload: response.data,
            });
            dispatch(getAllPosts(token));
            
        })
        .catch(error => console.log(error))
    }    
};





export const unlikePost = (token, userId, postId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return(dispatch) => {
        axios
        .put(`http://localhost:5000/posts/post/unlikepost`, {userId, postId}, config)
        .then((res) => {
            dispatch({
                type: LIKE_UNLIKE_POST,
                payload: res.data,
            });
            dispatch(getAllPosts(token));
        })
        .catch((err) => console.log(err));
    };
    
};



export const unlikeposttwo = (userId, token, postId) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/posts/post/unlikepost`, {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({userId, postId})
        })
        .then((response) => {
            dispatch({
                type: LIKE_UNLIKE_POST,
                payload: response.data,
            });
            dispatch(getAllPosts(token));
        })
        .catch(error => console.log(error))
    }    
}




export const createPost = (token, userId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return (dispatch) => {
        axios
        .get(`http://localhost:5000/posts/create/new/${userId}`, config)
        .then((res) => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
            dispatch(getAllPosts(token));
        })
        .catch((err) => console.log(err));
    };
};


export const deletePost = (token, postId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return(dispatch) => {
        axios
        .delete(`http://localhost:5000/posts/post/${postId}`, config)
        .then((res) => {
            dispatch({
                type: REMOVE_POST,
                payload: res.data,
            });
            dispatch(getAllPosts(token));
        })
        .catch((err) => console.log(err));
    };
    
};





export const addComment= (token, userId, postId, text) => {
    const config= {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    return (dispatch) => {
        axios
        .put(`http://localhost:5000/posts/post/addcomment`, { userId, postId, text}, config)
        .then((res) => {
            dispatch({
                type: ADD_DELETE_COMMENT,
                payload: res.data,
                userId,
            });
            dispatch(getAllPosts(token));
            
        })
        .catch((err) => console.log(err))
    };    
    
};



export const deleteComment = (token, userId, postId, comment) => {
    const config= {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    return (dispatch) => {
        axios
        .put(`http://localhost:5000/posts/post/deletecomment`, { userId, postId, comment}, config)
        .then((res) => {
            dispatch({
                type: ADD_DELETE_COMMENT,
                payload: res.data,
            });
            dispatch(getAllPosts(token));
            
        })
        .catch((err) => console.log(err))
    };   
    
};




export const searchTopics = (token, searchInput) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
            }
        };

        const body = JSON.stringify({searchInput});

        const res = await axios.put(`http://localhost:5000/posts/post/search_for_post`, body, config);

        dispatch({ type: SEARCH_TOPICS, payload: res.data});
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
}; 



export const getMostRecentPosts = () => async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/posts/post/the_most_recent"
      );
      dispatch({ type: THE_MOST_RECENT_POSTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
};


export const getMostCommentedPosts = () => async dispatch => {
    try{
        const res = await axios.get('http://localhost:5000/posts/post/the_most_commented');
        dispatch({ type: MOST_COMMENTED, payload: res.data });
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};



export const getMostLikedPosts = () => async dispatch => {
    try{
        const res = await axios.get('http://localhost:5000/posts/post/most_liked');
        dispatch({ type: MOST_LIKED_POSTS, payload: res.data });
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};




export const getPost = ( token, postId ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return(dispatch) => {
        axios
        .get(`http://localhost:5000/posts/post/single_post/${postId}`, config)
        .then((res) => {
            dispatch({
                type: GET_POST,
                payload: res.data,
            });
            dispatch(getAllPosts(token));
        })
        .catch((err) => console.log(err)); 
    };

};


export const getPostsSameProduct = (token) => {


return (dispatch) => {
    axios
    .get("http://localhost:5000/posts/productpage",)
    .then((res) => {
        dispatch({
            type: GET_POSTS_BY_PRODUCTS,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
};
};
















