import React, { useState, useEffect } from 'react';
import { getMostLikedPosts } from './../redux/actions/postActions';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from '../helpers/auth';


function CommentsRanking({ post }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);

    console.log(post);

    const jwt = isLogged();

    useEffect(() => {
        if(post.comments){
            setComments(post && post.comments);
            checkComment();
        }

    }, [post.comments]);  



    function checkComment(comments) {
        if(comments > 0){
            setComment(true);
        }
    };



    return (
        <div>
            <h6>{post.title}</h6>
            <h10>{comments? post.comments.length: 0}</h10>
        </div>
    )

}




export default CommentsRanking;