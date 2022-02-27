import React from 'react';
import { subscribe, unsubscribe } from '../redux/actions/userActions';

function FollowButton({ 
    handleButtonClick, 
    following, 
    userId, 
    token, 
    followId,
}) {

    async function followUser() {
        const userData = await subscribe(userId, followId, token);
        if(userData.error){
            console.log(userData.error);
        } else{
          handleButtonClick(userData.data);
        }
    };

    async function unfollowUser() {
        const userData = await unsubscribe(userId, followId, token);
        if(userData.error){
            console.log(userData.error);
        } else{
          handleButtonClick(userData.data);
        }
    }


    return (
        <div className = "row my-4">
            <div className="d-inline-block mt-5">
                {
                following ? (
                <button 
                onClick={()=> unfollowUser()}
                className = "btn btn-warning btn-raised mr-5">
                    Unfollow
                </button>
                ) : (
                <button 
                className = "btn btn-success btn-raised mr-5"
                onClick={()=> followUser()}>
                    Follow
                </button>
                )
                }
            </div>   
        </div>
    )
};


export default FollowButton;
