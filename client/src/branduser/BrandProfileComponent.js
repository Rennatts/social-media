import React from 'react';
import './css/BrandProfileComponent.css';
import {Link} from 'react-router-dom';


function BrandProfileComponent({ profile }) {
    return (
        <div className="post-by2">
            <Link to={`/brandusers/${profile._id}`}>
            <img 
                className= "img-fluid"
                src={profile.url}
                alt= {profile.brandname}
            ></img>
            <h5 className="profilename">{profile.brandname}</h5>
            </Link>
        </div>
    )
};

export default BrandProfileComponent;
