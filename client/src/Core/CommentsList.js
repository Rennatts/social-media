import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {isLogged} from '../helpers/auth';
import { addComment } from '../redux/actions/postActions';
import Comment from './Comment';



function CommentsList({ postId, comments }) {
    const jwt = isLogged();
    const dispatch = useDispatch();
    const [text, setText] = useState(); 

    const userId = jwt.user._id;


    function onChange(event){
        const value = event.target.value;
        setText(value)
         
    }


    function handleFormSubmit(event){
        event.preventDefault();

        dispatch(addComment(jwt.token, userId, postId, text));
        setText("");
    }

   
    return (
        <div>
            <form className="p-4 my-2 d-flex flex-row align-item-center">

                <img 
                    style={{height: "50px", width: "50px"}} 
                    className= "img-fluid rounded pr-2"
                    src={`http:localhost:5000/users/user/photo/${userId}`} 
                    alt= {jwt && jwt.user.name}
                ></img>

                <div className="form-group flex-grow-1">
                    <textarea 
                        rows="2"
                        cols="30"
                        onChange={onChange} 
                        type="text" 
                        name= "text"
                        placeholder="comment..."
                        required
                        value={text}
                        className="form-control"
                    ></textarea>
                </div>
                
                <button 
                onClick={handleFormSubmit}
                style={{width: "80px", height: "30px"}}
                className="btn btn-raised btn-primary" 
                >Submit</button>
            </form>

            {
                comments.map((item, index) => (
                    <Comment comment={item} key={index} postId={postId}></Comment>
                ))
            }
            
        </div>
    );
};

export default CommentsList;
