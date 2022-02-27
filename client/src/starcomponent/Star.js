import React, { useState, useEffect } from 'react';
import "./Star.css";


const Star = ({starId, rating, onMouseEnter, onMouseLeave, onClick}) => {
    let styleClass = "star-rating-blank";
    if(rating >= starId){
        styleClass = "star-rating-filled";
    }

    return (
        <div
        className="star"
        onMouseEnter = {onMouseEnter}
        onMouseLeave= {onMouseLeave}
        onClick={onClick}
        >
            <svg 
            className={styleClass} 
            height="55px" 
            width="53px" 
            viewBox="0 0 25 23"
            data-rating="1">
                <polygon stroke-width="0"
                points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78">
                </polygon>
            </svg>
        </div>   
    );
};


export default Star;