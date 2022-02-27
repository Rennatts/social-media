import {
    GET_ALL,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    LIKE_UNLIKE_PRODUCT,
    USER_POSTS,
    POST_ERROR,
    ADD_DELETE_COMMENT,
    ADD_COMMENT,
    SEARCH_TOPICS,
    THE_MOST_RECENT_POSTS,
    MOST_COMMENTED,
    MOST_LIKED_POSTS,
    GET_POST,
} from '../../types/productTypes';



const initialState = {
    products: [],
    branduserProducts: [],
    product: []
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL:
            return {
                ...state,
                products: action.payload,
            }
        case USER_POSTS:
            return {
                ...state,
                branduserProducts: action.payload,
            }
        case GET_POST:
            return {
                ...state, 
                product: action.payload,
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case REMOVE_PRODUCT:
            const updatedProducts = state.products.filter(
                (product) => product._id !== action.payload._id);

            const updatedBrandUserProducts = state.branduserProducts.filter(
                (product) => {
                    console.log(product);
                    if(product._id === action.productId){
                        return product._id !== action.payload._id
                    }
                }
            )
            return {
                ...state,
                products: updatedProducts,
                branduserProducts: updatedBrandUserProducts,
            };
        case LIKE_UNLIKE_PRODUCT:
            const newUpdatedProducts = Object.values(state.products).filter(
                (product) => {
                if (product === action.payload) {
                    product.likes = action.payload.likes;
                    return state.products;
                }
                return state.products;
            });
            const newBrandUserUpdatedProducts = Object.values(state.products).filter(
                (product) => {
                if (product.brand._id === action.branduserId) {
                    product.likes = action.payload.likes;
                    return state.branduserProducts;
                }
                return state.branduserProducts;
            });
            return {
                ...state,
                products: newUpdatedProducts,
                branduserProducts: newBrandUserUpdatedProducts
            }
        case ADD_DELETE_COMMENT:
        const afterCommentActionUpdatedProducts  = Object.values(state.products).filter(
            (product) => {
            if (product === action.payload) {
                product.comments = action.payload.comment;
                return state.products;
            }
            return state.products;
        });
        const afterCommentActionBrandUserUpdatedProducts = Object.values(state.branduserProducts).filter(
            (product) => {
            if (product.brand._id === action.branduserId) {
                product.comments = action.payload.comments;              
                return state.branduserProducts;
            }
            return state.branduserProducts;
        });
        return {
            ...state,
            products: afterCommentActionUpdatedProducts,
            branduserProducts: afterCommentActionBrandUserUpdatedProducts 
        };
        case POST_ERROR: 
        return {
           ...state
        };  
        case SEARCH_TOPICS:
            return {
                ...state,
                product: action.payload,
            }
        case THE_MOST_RECENT_POSTS:
        case MOST_COMMENTED:
        case MOST_LIKED_POSTS: 
        return {
            ...state,
            products: action.payload,
        }; 
        default:
            return state;
    }
};



export default productsReducer;