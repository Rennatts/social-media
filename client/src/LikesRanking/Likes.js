import React, { useState, useEffect } from 'react';
import { getMostLikedPosts } from './../redux/actions/postActions';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import LikesRanking from './LikesRanking';


function Likes({posts}) {
    const jwt = isLogged();
    const dispatch = useDispatch();


    useEffect(() => {
        if(jwt){
            function loadPost(){
                dispatch(getMostLikedPosts())
            }
            loadPost()
        }

    }, [dispatch]);

    console.log(posts);

 

    return (
        <div>
            {posts.map((post) => (
                <LikesRanking post={post} key={post._id}></LikesRanking>
            ))}
            
        </div>
    )
}


const mapStateToProps = ({ post: {posts} }) => ({
    posts
});

export default connect(mapStateToProps, null)(Likes);