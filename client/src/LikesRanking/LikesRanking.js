import React, { useState, useEffect } from 'react';
import { getMostLikedPosts } from './../redux/actions/postActions';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from '../helpers/auth';


function LikesRanking({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);

    console.log(post);

    const jwt = isLogged();


    useEffect(() => {
        setLikes(post && post.likes);

        checkLike(post && post.likes);
        
    }, [post.likes]);   

    
    function checkLike(likes) {
        const userId = jwt.user._id;
        let match = likes.indexOf(userId) !== -1;
        setLike(match);

    };


    return (
        <div>
            <h6>{post.title}</h6>
            <h10>{likes? post.likes.length: 0}</h10>
        </div>
    )

}




export default LikesRanking;