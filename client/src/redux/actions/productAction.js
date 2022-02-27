import {
    GET_ALL,
    GET_POST,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    USER_POSTS,
    LIKE_UNLIKE_PRODUCT,
    POST_ERROR,
    ADD_DELETE_COMMENT,
    SEARCH_TOPICS,
    MOST_LIKED_POSTS,
    MOST_COMMENTED,
    THE_MOST_RECENT_POSTS
} from '../types/productTypes';

import axios from 'axios';



export const getAllProducts = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return (dispatch) => {
        axios
        .get("http://localhost:5000/products/allproducts", config)
        .then((res) => {
            dispatch({
                type: GET_ALL,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
    };

};




export const getProductsByBrand = (token, branduserId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return (dispatch) => {
        axios
        .get(`http://localhost:5000/products/productsby/${branduserId}`, config)
        .then((res) => {
            dispatch({
                type: USER_POSTS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
    };
};



export const addProduct = (token, branduserId, postData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    return (dispatch) => {
        axios
        .post(`http://localhost:5000/products/create/${branduserId}`, postData, config)
        .then((res) => {
        console.log(res);
            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            });

        })
        .catch((err) => console.log(err));
    };
};


export const getProduct = ( token, branduserId ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return(dispatch) => {
        axios
        .get(`http://localhost:5000/products/productsby/${branduserId}`, config)
        .then((res) => {
            dispatch({
                type: USER_POSTS,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err)); 
    };

};



export const deleteProduct = (token, productId, branduserId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return(dispatch) => {
        axios
        .delete(`http://localhost:5000/products/${productId}`, config)
        .then((res) => {
            dispatch({
                type: REMOVE_PRODUCT,
                payload: res.data,
            });
            
        })
        .catch((err) => console.log(err));
    };
    
};



export const likeproducttwo = (branduserId, token, productId) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/products/product/likeproduct`, {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({branduserId, productId})
        })
        .then((response) => {
            dispatch({
                type: LIKE_UNLIKE_PRODUCT,
                payload: response.data,
            });
            dispatch(getAllProducts());
            
        })
        .catch(error => console.log(error))
    }    

};



export const unlikeproducttwo = (branduserId, token, productId) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/products/product/unlikeproduct`, {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({branduserId, productId})
        })
        .then((response) => {
            dispatch({
                type: LIKE_UNLIKE_PRODUCT,
                payload: response.data,
            });
            dispatch(getAllProducts());
           
        })
        .catch(error => console.log(error))
    }    
};


export const searchProduct = (token, searchBrand, searchProductname ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    return (dispatch) => {
        axios
        .put(`http://localhost:5000/products/search_for_post`, {searchBrand, searchProductname}, config)
        .then((res) => {
            dispatch({
                type: SEARCH_TOPICS,
                payload: res.data
            });

        })
        .catch((err) => console.log(err));
    };

}; 