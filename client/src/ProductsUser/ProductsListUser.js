import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import FinalProductUser from './FinalProductUser';


function ProductsList({ products }) {

    const dispatch = useDispatch();
    const jwt = isLogged();
    const[data, setData] = useState([]);

    useEffect(() => {
        setData(products);
    }, [products])


    return (
        <div className="row my-5">
            <div className="col-md-8 mx-auto">
                {data && data.map((item, i)=> {
                    return <FinalProductUser branduserProduct={item} key={item._id}></FinalProductUser>
                })}
            </div>   
        </div>
    )
};



export default ProductsList;