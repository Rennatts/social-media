import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import { Link } from 'react-router-dom';
import { getProduct } from '../redux/actions/productAction';
import MyProductsList from './MyProductsList';



function MyProduct({ branduserProducts }) {

    const jwt = isLogged();
    const dispatch = useDispatch();

    //const productId = (match.params.productId);
    const token = jwt.token;
    const branduserId = jwt.branduser._id;

    useEffect(() => {
        if(jwt){
            function loadPost(){
                dispatch(getProduct(token, branduserId))
            }
            loadPost()
        }
    }, [dispatch]);


    if(!jwt){
        return(
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-8 mx-auto">
                        <div className="alert alert-info">
                            <Link to="/signin">Log In to have access to all the posts</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div>
            <MyProductsList branduserProducts={branduserProducts}></MyProductsList>
        </div>
    )


}


const mapStateToProps = ({ product: { branduserProducts } }) => ({
    branduserProducts
})


export default connect(mapStateToProps, null)(MyProduct);
