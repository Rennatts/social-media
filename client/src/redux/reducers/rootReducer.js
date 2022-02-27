import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import postReducer from './post/postReducer';
import branduserReducer from './branduser/branduserReducer';
import productReducer from './product/productReducer';


const rootReducer = combineReducers({
    user: userReducer, 
    post: postReducer,
    branduser: branduserReducer,
    product: productReducer,
});


export default rootReducer;