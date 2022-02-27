import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect, useHistory  } from 'react-router-dom';
import { isLogged, checkBrandAuth, logout } from '../helpers/auth';
import { getBrandUser } from '../redux/actions/branduserActions';
import { useDispatch, connect } from "react-redux";
import {getProductsByBrand} from '../redux/actions/productAction';
import BrandPost from './BrandPost';
import { removeLikeToBranduser, addLikeToBranduser } from '../redux/actions/branduserActions';




function BrandUserProfile({ branduserProducts }) {
    const { branduserId } = useParams();
    const jwt = isLogged();
    const[ loading, setLoading ] = useState(true);
    const [likes, setLikes] = useState([]);
    const [error, setError] = useState();
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState();


    const token = jwt && jwt.token;
    const userId = jwt.user._id;

    useEffect(() => {
        async function getProfile(){
            const userData = await getBrandUser(branduserId);
            console.log(userData);
            if(userData.error){
                setError(userData.error);
            } else{
                setUser(userData.data);
            }
        }

        getProfile();

        dispatch(getProductsByBrand(token, branduserId));


        return()=> {
            setLoading(false);
        };
    }, [loading, false]);


    useEffect(()=> { 
        setLikes(user && user.likes);
    
    },[user && user.likes]);



    function checkLike(likes) {
        const userId = jwt.user._id;
        let match = likes.indexOf(userId) !== -1;
        setLike(match);

    };



    console.log(branduserProducts);

    console.log(likes);

    console.log(user);
    
    console.log(like);

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>
            <p>Hello world</p>

            <div className="row">
                <div className="col-md-6">
                    <img 
                        style={{height: "200px", width: "auto"}} 
                        className= "img-thumbnail"
                        src={user && user.url}  
                        alt= {user && user.brandname}
                    ></img>
                </div>

            </div> 

            <div className="row">
                <div className="col md-12 mb-7">
                    <p className="lead">{user && user.brandname}</p>
                </div>
                {
                    like ? ( 
                        <h5 className="mr-2">
                        <span className="badge badge-danger p-2 mr-2">
                            {" "}
                            {like ? likes.length: 0}{" "}
                        </span>
                        <i onClick={()=> dispatch(removeLikeToBranduser(userId, branduserId))}
                        className="fa fa-heart text-danger mr-2">
                        </i>
                        </h5>
                    ) : (
                        <h5 className="mr-2">
                        <span className="badge p-2 mr-2">
                            {" "}
                            {like ? likes.length: 0}{" "}
                        </span>
                        <i onClick={()=> dispatch(addLikeToBranduser(userId, branduserId))}
                        className="fa fa-heart text-danger mr-2">
                        </i>
                        </h5>
                    )
                }
            </div>

            <div className="row">
                <div className="col md-12 mb-5">
                    <hr></hr>
                    <p className="lead">{user && user.about}</p>
                    <hr></hr>
                </div>
            </div>

            <div className="row my-5">
            <div className="col-md-8 mx-auto">
                {branduserProducts.map((item, i)=> {
                    return <BrandPost branduserProduct={item} key={item._id}></BrandPost>
                })}
            </div>   
        </div>

        </div>
    );  
};



const mapStateToProps = ({ 
    product: { branduserProducts} 
}) => ({
    branduserProducts

});





export default connect(mapStateToProps, null)(BrandUserProfile);