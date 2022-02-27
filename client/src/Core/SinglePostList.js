import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import { Link } from 'react-router-dom';
import { getPost, deletePost, unlikeposttwo, likeposttwo } from './../redux/actions/postActions';
import CommentList from './../Core/CommentsList';



function SinglePostList({ post, match}) {

    let [data, setData] = useState();
    let [error, setError] = useState();

    const jwt = isLogged();
    const dispatch = useDispatch();

    const postId = (match.params.postId);
    const token = jwt.token;
    const userId = jwt.user._id;

    //console.log(match.params.postId)

    
    useEffect(() => {
        if(jwt){
            function loadPost(){
                dispatch(getPost(token, postId))
            }
            loadPost()
        }
    }, [dispatch]);

    console.log(post);


    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);
    const [photo, setPhoto] = useState([]);
    const [name, setName] = useState([]);
    const [id, setId] = useState([]);


    useEffect(() => {
        setLikes(post && post.likes);
        if(post.comments){
            setComments(post && post.comments);
            checkComment();
        }

        if(post && post.postedBy.name){
            setName(post && post.postedBy.name)
        }

        if(post.photo){
            setPhoto(post && post.photo);
        }

        if(post.postedBy._id){
            setId(post.postedBy._id)
        }

        checkLike(post && post.likes);
        
    }, [post.likes, post.comments]);   



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
        
    };

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

    console.log(post);


    const photoUrl = photo ?
    `http://localhost:5000/posts/post/photo/${postId}?${new Date().getTime()}` : null


    return (
    <div className="card mb-2 border border-primary">
        <div className="card-header bg-light">
            <div className="d-flex flex-row justify-content-start">
                <div className="post-by">
                    <img 
                    style={{height: "50px", width: "50"}} 
                    className= "img-fluid rounded pr-2 mr-1"
                    src={`http:localhost:5000/users/user/photo/${jwt.user._id}?${new Date().getTime()}`} 
                    alt= {name}
                    ></img>

                    <h5 className="text-dark font-weight-bold">
                        {post.brand}
                    </h5>

                    <h5 className="text-dark font-weight-bold">
                        {post.productName}
                    </h5>
                    <h7 className="text-dark font-weight">
                      {name || jwt.user.name}
                    </h7>
                    <hr></hr>
                    <h10 className="text font-weight-bold">
                        {post.created}
                    </h10>
                </div>
            </div>
        </div> 
        <div>
            <img style={{height: "400px", width: "728px"}} src={photoUrl} alt={post.photo}></img>
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
                {id === jwt.user._id && 
                <div className="float-right">
                    <i onClick={confirDeletePost}
                    className="fa fa-trash bts btn"></i>
                </div>}
            </div>
        </div>
        <CommentList postId={post._id} comments={comments && comments}></CommentList>
    </div>
    )
}


const mapStateToProps = ({ post: { post } }) => ({
    post
})


export default connect(mapStateToProps, null)(SinglePostList);