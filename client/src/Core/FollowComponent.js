import React from 'react';
import { useHistory } from 'react-router-dom';


function FollowComponent({data}) {
    const history = useHistory();

    return (
        <div>
            <div className="row my-4">
                <div className="col-md-8 mx-auto p-2">
                    <div className="row">
                        {data && data.map((user) => (
                        <div 
                            className="col-md-3"
                            key={user._id}
                            onClick={()=> history.push(`/user/${user._id}`)}>                                  
                            <img 
                                src={`http://localhost:5000/users/user/photo/${user._id}`} 
                                width="50" 
                                height="50" 
                                className="img-fluid rounded pr-2"
                                alt= "userphoto"
                            ></img>
                            <h4 className="mt-3">{user.name}</h4>
                        </div>   
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default FollowComponent
