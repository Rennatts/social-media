import React, { useEffect, useState } from 'react';
import { getMostCommentedPosts } from './../redux/actions/postActions';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import CommentsRanking from './CommentsRanking';


function Likes({posts}) {
    const jwt = isLogged();
    const dispatch = useDispatch();


    useEffect(() => {
        if(jwt){
            function loadPost(){
                dispatch(getMostCommentedPosts())
            }
            loadPost()
        }

    }, [dispatch]);


 

    return (
        <div>
            {posts.map((post) => (
                <CommentsRanking post={post} key={post._id}></CommentsRanking>
            ))}  
        </div>
    )
}





const mapStateToProps = ({ post: {posts} }) => ({
    posts
});

export default connect(mapStateToProps, null)(Likes);