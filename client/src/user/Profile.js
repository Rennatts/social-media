import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect, useHistory  } from 'react-router-dom';
import { isLogged, checkAuth, logout } from '../helpers/auth';
import { getUser, deleteUser } from '../redux/actions/userActions';
import FollowButton from './../Core/FollowButton';
import DefaultProfile from '../images/avatar.jpg';
import FollowComponent from '../Core/FollowComponent';
import { useDispatch, connect } from "react-redux";
import {TOGGLE_SUCCESS} from '../redux/types/userTypes';
import { signout  } from './../auth';
import { getPostsByUser } from '../redux/actions/postActions';
import PostList from './../Core/PostList';



function Profile({ userSuccess, userError, userPosts }) {
    const { userId } = useParams();
    const jwt = isLogged();
    const[ error, setError ] = useState("");
    const[ following, setFollowing ] = useState(false);
    const[ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const date = user && user.created ? new Date(user.created): null;
    const history = useHistory();
    const [key, setKey]= useState();
    const [redirect, setRedirect] = useState(false);


    
    useEffect(() => {
        async function getProfile() {
            const userData = await getUser(userId, jwt.token);
            if(userData.error){
                setError(userData.error);
            } else{
              setUser(userData.data);
              setFollowing(checkFollow(userData.data));
            }
            
        }

        //check follow
        function checkFollow(user){
            const match = user.followers.find(follower => {
            //one id has many other ids(followers) and vice versa
            return follower._id === jwt.user_id;
        })
        return match;
        }
        if(loading) {
            getProfile();
        }
        return()=> {
            setLoading(false);
        };
    }, [loading, false]);


    useEffect(() => {
        if(userSuccess) {
            dispatch({ type: TOGGLE_SUCCESS});
            logout(() => {
                return <Redirect to="/" ></Redirect>
            });
        }
        if(userError) {
            setError(userError);
        }
        function loadUserPosts(){
            dispatch(getPostsByUser(jwt.token, userId));
        }
        loadUserPosts();
    }, [userError, userSuccess, dispatch]);



    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    };


    function handleButtonClick(user){
        setUser(user);
        setFollowing(!following)
    };




    function deleteConfirmed(){
        let answer = window.confirm("Are you sure you want to delete your account? ")
        if(answer) {
            dispatch(deleteUser(userId, jwt.token));
            setRedirect(true);
        }
    };

    console.log(userPosts);



    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>

            {redirect ? (
               <Redirect to="/" ></Redirect>
            ) : (
            <div className="row">

                <div className="col-md-6">
                <img 
                    style={{height: "200px", width: "auto"}} 
                    className= "img-thumbnail"
                    src={user && user.url}  
                    alt= {user && user.name}
                    onError= {i => (i.target.src= `${DefaultProfile}`)}
                ></img>  
                </div>

                <div className="col-md-6">
                    <div className="lead mt-2">
                        <p>Hello {user && user.name}</p>
                        <p>E-mail {user && user.email}</p>
                        <span 
                        className="badge badge-danger col-4">
                            Inscrito em: {date && date.toLocaleDateString()}
                        </span>
                        <div className="col md-12 mb-5">
                            <hr></hr>
                            <p className="lead">{user && user.about}</p>
                            <hr></hr>
                        </div>
                    </div> 
                </div>

                {
                    checkAuth(userId) ?
                    (
                    <div className = "d-inline-block">
                        <Link 
                        className="btn btn-raised btn-success mr-5" 
                        to={`/user/edit/${userId}`}>Edit profile
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
                        followId = {user && user._id}
                        userId = {jwt && jwt.user._id}
                        ></FollowButton>
                    )
                }
                
                <hr></hr>
                <h3 className="text-primary">Followers</h3>
                <hr></hr>
                <FollowComponent data={user && user.followers}></FollowComponent>

                <h3 className="text-primary">Following</h3>
                <hr></hr>
                <FollowComponent data={user && user.following}></FollowComponent>
                

                <hr></hr>
                <h3 className="text-primary">Publications</h3>
                <PostList posts={userPosts}></PostList>

            </div>
            )
            }

        </div>
    );  
};


const mapStateToProps = ( { 
    user: {userSuccess, userError}, 
    post: {userPosts},
}) => ({
    userSuccess,
    userError,
    userPosts
});





export default connect(mapStateToProps, null)(Profile);