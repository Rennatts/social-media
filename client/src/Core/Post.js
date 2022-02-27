import React, {useState, useEffect} from 'react'
import { isLogged } from '../helpers/auth';
import { useDispatch } from 'react-redux';
//import {likeposttwo, unlikepost} from '../user/apiUser';
import {likeposttwo, unlikeposttwo, deletePost} from './../redux/actions/postActions';
import CommentsList from '../Core/CommentsList';
import Moment from "react-moment";
import { Link } from 'react-router-dom';




function Post({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);
    const [fullproduct, setFullproduct]= useState();

    const date = new Date(post.created);
    const jwt = isLogged();
    const dispatch =  useDispatch();

    const postId = post._id;
    const token = jwt.token;
    const userId = jwt.user._id;


    useEffect(() => {
        setLikes(post.likes);
        if(post.comments){
            setComments(post.comments);
            checkComment();
        }

        checkLike(post.likes);
        removeSpace(post);
        
    }, [post.likes, post.comments]);  


    function removeSpace(post){
        const product = post.productname.replace(" ", "");
        const brand = post.brand.replace(" ", "");
        setFullproduct(brand+product);

    }



    function checkLike(likes) {
        const userId = jwt.user._id;
        let match = likes.indexOf(userId) !== -1;
        setLike(match);

    };


    function checkComment(comments) {
        if(comments > 0){
            setComment(true);
        }
    };

    function confirDeletePost(){ 
        let answer = window.confirm("Are you sure you want to delete post?")
        if(answer) {
            dispatch(deletePost(jwt.token, post._id));
        }
        
    }

    console.log(post);


    return (
        <div className="card mb-2 border border-primary">
            <div className="card-header bg-light">
                <div className="d-flex flex-row justify-content-start">
                    <div className="post-by">
                    <div className="post-by2">
                        <Link to={`/user/${post.postedBy._id}`}>
                        <img style={{height: "80px", width: "120px"}}
                            className= "img-fluid"
                            src= {post.postedBy.url}
                            alt= {post.postedBy.name}
                        ></img>
                        <h5 className="profilename">{post.postedBy.name}</h5>
                        <h7>Followers: {post.postedBy.followers.length}</h7>
                        </Link>
                    </div>

                        <Link to={`/productPage/${fullproduct}`}>
                        <h5 className="text-dark font-weight-bold">
                            {post.productname}
                        </h5>

                        <h5 className="text-dark font-weight-bold">
                            {post.brand}
                        </h5>
                        </Link>

                        <hr></hr>
                        <h10 className="text font-weight-bold">
                            {(post.url.length > 1) ? (
                                post.url.map((item, index) => (
                                    <img style={{height: "400px", width: "728px"}} src={item}  key={item._id} alt={item.id}></img>

                                ))
                            ) : (
                            <img style={{height: "400px", width: "728px"}} src={post.url} alt={post.productname}></img>
                            )}           
                        </h10>
                    </div>
                </div>
            </div> 
            <div>
            
            </div>
            <div className="card-body">
                {post.body}
            </div>   
            <div className="card-footer">
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <div className="card-footer">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            {
                                like ? ( 
                                <h5 className="mr-2">
                                <span className="badge badge-danger p-2 mr-2">
                                    {" "}
                                    {likes? likes.length: 0}{" "}
                                </span>
                                <i onClick={()=> dispatch(unlikeposttwo(userId, token, postId))}
                                className="fa fa-heart text-danger mr-2">
                                </i>
                                </h5>
                            ) : (
                                <h5 className="mr-2">
                                <span className="badge p-2 mr-2">
                                    {" "}
                                    {likes? likes.length: 0}{" "}
                                </span>
                                <i onClick={()=> dispatch(likeposttwo(userId, token, postId))}
                                className="fa fa-heart text-danger mr-2">
                                </i>
                                </h5>
                            )
                            }

                            <h5 className="mr-2">
                                <span className="badge badge-primary p-2 mr-2">
                                    {" "}
                                    {comments ? comments.length: 0}{" "}
                                </span>
                            </h5>
                            <i className="fa fa-comment text-primary"></i>
                        </div>
                    </div>
                    {post.postedBy._id === jwt.user._id && 
                    <div className="float-right">
                        <i onClick={confirDeletePost}
                        className="fa fa-trash bts btn"></i>
                    </div>}
                </div>
            </div>
            <CommentsList postId={post._id} comments={comments && comments}></CommentsList>
        </div>
    )

};


export default Post;