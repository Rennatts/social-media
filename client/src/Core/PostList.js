import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import Post from './Post';

function PostList({posts}) {

    const dispatch = useDispatch();
    const jwt = isLogged();
    const[data, setData] = useState([]);


    useEffect(() => {
        setData(posts);
    }, [posts])




    return (
        <div className="row my-5">
            <div className="col-md-8 mx-auto">
                {data.map((item, i)=> {
                    return <Post post={item} key={item._id}></Post>
                })}
            </div>   
        </div>
    )
};



export default PostList;