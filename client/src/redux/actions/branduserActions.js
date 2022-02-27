import {
    GET_USERS,
    AUTHENTICATION,
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
} from '../types/branduserTypes';
import axios from 'axios';

import { saveUserToLocalStorage, isLogged } from '../../helpers/auth';



export const getAllBrandUsers = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return (dispatch) => {
        axios
        .get("http://localhost:5000/brandusers/allbrandusers", config)
        .then(res => {
            console.log(res);
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error
                })
            } else {
                dispatch({
                    type: GET_USERS,
                    payload: res.data
                });
            }
        })
        .catch(err=> console.log(err))
    };

}




export const brandSignup = (user) => {
    return (dispatch) => {
        axios
        .post("http://localhost:5000/brandauth/signup", user)
        .then(res => {
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error
                })
            } else {
                dispatch({
                    type: REGISTER,
                    payload: res.data
                });
                console.log(res.data);
            }
        })
        .catch(err=> console.log(err))
    };
};



export const brandSignin = (user) => {
    return (dispatch) => {
        axios
        .post("http://localhost:5000/brandauth/signin", user)
        .then(res => {
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error
                })
            } else {
                saveUserToLocalStorage(res.data);
                dispatch({
                    type: AUTH,
                    payload: res.data
                });
            }
        })
        .catch(err=> console.log(err))

    };

};



export const authCheck = () => {
    return dispatch => {
        dispatch({
            type: CHECK_AUTH,
            payload: isLogged() ? isLogged() : null,
        });
    };
}




export const getBrandUser = (branduserId) => {
    return axios.get(`http://localhost:5000/brandusers/${branduserId}`)
        .then((res) => {
            if (res.data.error) {
                return {error: res.data.error };
            } else {
              return {data: res.data};  
            }
        })
        .catch((err) => console.log(err));
};



export const deleteBrandUser = (branduserId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    return (dispatch) => {
        axios.delete(`http://localhost:5000/brandusers/likebrand/${branduserId}`, config)
        .then((res) => {
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error,
                })
            } else {
                dispatch({
                    type: DELETE,
                    payload: branduserId,
                });
            }
        })
        .catch((err) => console.log(err));
    }
};






export const likebranduser = (userId, token, branduserId) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/brandusers/likebrand`, {
            method: "PUT", 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, branduserId })
        })
        .then((response) => {
            console.log(response.data);
            dispatch({
                type: LIKE_UNLIKE_USER,
                payload: response.data,
            });
            
        })
        .catch(error => console.log(error))
    }    
}; 




export const removeLikeToBranduser = (userId, branduserId) => {
    return (dispatch) => {
        axios
        .put(`http://localhost:5000/brandusers/unlikebrand/${branduserId}/${userId}`)
        .then((response) => {
            console.log(response);
            dispatch({
                type: LIKE_UNLIKE_USER,
                payload: response.data,
            });
            dispatch(getBrandUser(branduserId));
            
        })
        .catch(error => console.log(error))
    };    
}



export const likeposttwo = (userId, branduserId) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/brandusers/likebrand`, {
            method: "PUT", 
            body: JSON.stringify({userId, branduserId})
        })
        .then((response) => {
            console.log(response);
            dispatch({
                type: LIKE_UNLIKE_USER,
                payload: response.data,
            });
            dispatch(getBrandUser(branduserId));
            
        })
        .catch(error => console.log(error))
    }    
};

export const unlikeposttwo = (userId, branduserId) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/brandusers/unlikebrand`, {
            method: "PUT", 
            body: JSON.stringify({userId, branduserId})
        })
        .then((response) => {
            dispatch({
                type: LIKE_UNLIKE_USER,
                payload: response.data,
            });
            dispatch(getBrandUser(branduserId));
        })
        .catch(error => console.log(error))
    }    
}





export const addLikeToBranduser = (userId, branduserId) => {
    return (dispatch) => {
        axios
        .put(`http://localhost:5000/brandusers/likebrand/${branduserId}/${userId}`)
        .then((response) => {
            console.log(response);
            dispatch({
                type: LIKE_UNLIKE_USER,
                payload: response.data,
            });
            dispatch(getBrandUser(branduserId));
            
        })
        .catch(error => console.log(error))

    };

}