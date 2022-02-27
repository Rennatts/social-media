import React from 'react';

function Products({ product }) {
    return (
        <div>
            <div>
                <h4>{product.brand}</h4>
                <h10>{product.category}</h10>
            </div>  
        </div>
    )
}

export default Products
