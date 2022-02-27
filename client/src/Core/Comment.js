import React from 'react';
import { useDispatch } from 'react-redux';
import { isLogged } from '../helpers/auth';
import { deleteComment } from './../redux/actions/postActions';

function Comment({ comment, postId}) {
    const jwt = isLogged();
    const dispatch = useDispatch();
    const date = new Date(comment.created);

    const postedBy = comment.postedBy._id;

    const userId = jwt.user._id;
    


    function confirDeleteComment(){ 
        let answer = window.confirm("Are you sure you want to delete the comment?")
        if(answer) {
            dispatch(deleteComment(jwt.token, userId, postId, comment));
        }
        
    };



    

    return (
        <div className="mb-2 col-12">
            <div className="card-header bg-danger text-white rounded">
                <div>

                <div className="d-flex flex-row justify-content-start">
                <img 
                    style={{height: "50px", width: "50"}} 
                    className= "img-fluid rounded pr-2"
                    src={`http://localhost:5000/users/user/photo/${comment.postedBy._id}`} 
                    alt= {comment.postedBy.name}
                ></img>
                </div>

                    {comment.postedBy._id === jwt.user._id && 
                    <div className="col-12">
                        <i onClick={confirDeleteComment}
                        className="fa fa-trash bts btn-danger ml-auto"></i>
                    </div>}

                    <h5 className="text-white font-weight-bold">
                        {comment.postedBy.name}
                    </h5>
                    <h5 className="text-white font-weight-bold">
                        {date.toLocaleDateString()}
                    </h5>
                </div>
            </div>
            <div className="card-body border border-danger">
                <div className="card-text">
                    {comment.text}
                </div>
            </div>

        </div>
    )
};




export default Comment;