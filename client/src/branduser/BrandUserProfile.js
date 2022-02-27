import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect, useHistory  } from 'react-router-dom';
import { isLogged, checkBrandAuth, logout } from '../helpers/auth';
import { getBrandUser, deleteBrandUser } from '../redux/actions/branduserActions';
import FollowButton from '../Core/FollowButton';
import DefaultProfile from '../images/avatar.jpg';
import FollowComponent from '../Core/FollowComponent';
import { useDispatch, connect } from "react-redux";
import {TOGGLE_SUCCESS} from '../redux/types/branduserTypes';
import { isAuthenticated, brandSignout  } from './../auth';
import {getProductsByBrand} from './../redux/actions/productAction';



function BrandUserProfile({ branduserProducts }) {
    const { branduserId } = useParams();
    const jwt = isLogged();
    const[ error, setError ] = useState("");
    const[ following, setFollowing ] = useState(false);
    const[ branduser, setBranduser ] = useState(null);
    const[ loading, setLoading ] = useState(true);
    const dispatch = useDispatch();
    const date = branduser && branduser.created ? new Date(branduser.created): null;
    const history = useHistory();

    const token = jwt && jwt.token;




    
    useEffect(() => {
        async function getProfile() {
            const userData = await getBrandUser(branduserId, token);
            if(userData.error){
                setError(userData.error);
            } else{
              setBranduser(userData.data);
              setFollowing(checkFollow(userData.data));
            }
            
        }

        //check follow
        function checkFollow(branduser){
            const match = branduser.followers.find(follower => {
            //one id has many other ids(followers) and vice versa
            return follower._id === jwt.branduser_id;
        })
        return match;
        }
        if(loading) {
            getProfile();
        }
        return()=> {
            setLoading(false);
        };
    }, [branduserId, token, loading]);


    useEffect(() => {
        function loadBrandUserPosts(){
            dispatch(getProductsByBrand(token, branduserId));
        }
        loadBrandUserPosts();
    }, [dispatch, token]);

    console.log(branduser);

    console.log(branduserProducts);
    

    function handleButtonClick(branduser){
        setBranduser(branduser);
        setFollowing(!following)
    };



    function deleteConfirmed(){
        let answer = window.confirm("Are you sure you want to delete your account? ")
        if(answer) {
            dispatch(deleteBrandUser(branduserId, jwt.token), brandSignout(()=> history.push('/')))
        }
    }

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>

            <div className="row">

            <div className="col-md-6">
            <img 
                style={{height: "200px", width: "auto"}} 
                className= "img-thumbnail"
                src={branduser && branduser.url}  
                alt= {branduser && branduser.brandname}
            ></img>
            </div>


                {
                    checkBrandAuth(branduserId) ?
                    (
                    <div className = "d-inline-block">
                        <Link 
                        className="btn btn-raised btn-success mr-5" 
                        to={`/brandusers/edit/${branduserId}`}>Edit profile
                        </Link>


                        <Link 
                        to="#" 
                        onClick={() => deleteConfirmed()}>
                            <i className="fa fa-trash btn btn-danger btn-sm">Delete account</i>
                        </Link>

                    </div>
                    ) : (
                        <FollowButton 
                        following = {following}
                        handleButtonClick = {handleButtonClick}
                        token = {jwt && jwt.token}
                        followId = {branduser && branduser._id}
                        branduserId = {jwt && jwt.branduser._id}
                        ></FollowButton>
                    )
                }
                
                <hr></hr>
                <h3 className="text-primary">Followers</h3>
                <hr></hr>
                <FollowComponent data={branduser && branduser.followers}></FollowComponent>
            

                <div className="col-md-6">
                    <div className="lead mt-2">
                        <p>Hello {branduser && branduser.brandname}</p>
                        <p>E-mail {branduser && branduser.email}</p>
                        <span 
                        className="badge badge-danger col-4">
                            Inscrito em: {date && date.toLocaleDateString()}
                        </span>
                    </div> 
                </div>
            </div>


            
            <div className="row">
                <div className="col md-12 mb-5">
                    <hr></hr>
                    <p className="lead">{branduser && branduser.about}</p>
                    <hr></hr>
                </div>
            </div>
        </div>
    );  
};



const mapStateToProps = ({ product: { branduserProducts }}) => ({
    branduserProducts
});



export default connect(mapStateToProps, null)(BrandUserProfile);