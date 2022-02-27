import React, {useState, useEffect} from 'react'
import { isLogged } from '../helpers/auth';
import { useDispatch } from 'react-redux';
//import {likeposttwo, unlikepost} from '../user/apiUser';
import { deleteProduct } from '../redux/actions/productAction';
import Moment from "react-moment";
import Star from '../starcomponent/Star';


function FinalProduct({ branduserProduct }) {
    const [rating, setRating] = useState(0);
    const [hoverState, setHoverState] = useState(0);
    const stars = [1, 2, 3, 4, 5];

    const date = new Date(branduserProduct.created);
    const jwt = isLogged();
    const dispatch =  useDispatch();

    const branduserId = jwt.user._id;

    const productId = branduserProduct._id;
    const token = jwt.token;

    
    function confirmDeletePost(){ 
        let answer = window.confirm("Are you sure you want to delete post?")
        if(answer) {
            dispatch(deleteProduct(token, productId));    
        }
    };



    const photoUrl = branduserProduct.photo ?
    `http://localhost:5000/products/photo/${productId}?${new Date().getTime()}` : null


    return (
        <div className="card mb-2 border border-primary">
            <div className="card-header bg-light">
                <div className="d-flex flex-row justify-content-start">
                    <div className="post-by">
                        <img 
                        style={{height: "50px", width: "50"}} 
                        className= "img-fluid rounded pr-2 mr-1"
                        src={`http:localhost:5000/branduser/photo/${branduserId}?${new Date().getTime()}`} 
                        alt= {branduserProduct.brand.brandname}
                        ></img>
    
                        <h5 className="text-dark font-weight-bold">
                            {branduserProduct.productname}
                        </h5>
    
                        <h5 className="text-dark font-weight-bold">
                            {branduserProduct.category}
                        </h5>
                        <hr></hr>
                        <h10 className="text font-weight-bold">
                           <Moment format="HH:mm YYYY-MM-DD">{branduserProduct.created}</Moment>
                        </h10>
                    </div>
                </div>
            </div> 
            <div>
                <img style={{height: "400px", width: "728px"}} src={photoUrl} alt={branduserProduct.photo}></img>
            </div>
            <div className="card-body">
                {branduserProduct.description}
            </div>   
            <div className="card-footer">
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <div className="card-footer">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                        {
                                stars.map((star, i) => (
                                    <Star 
                                    key={i}
                                    starId={i}
                                    rating = {hoverState || rating}
                                    onMouseEnter = {() => setHoverState(i)}
                                    onMouseLeave = {() => setHoverState(0)}
                                    onClick = {() => setRating(i)}
                                    ></Star>
                                ))
                            }
                        </div>
                    </div>
                    {branduserProduct.brand._id ===  branduserId && 
                    <div className="float-right">
                        <i onClick={confirmDeletePost}
                        className="fa fa-trash bts btn"></i>
                    </div>}
                </div>
            </div>
        </div>
    )

};


export default FinalProduct;