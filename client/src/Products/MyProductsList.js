import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import FinalProduct from './FinalProduct';


function MyProductsList({ branduserProducts }) {

    const dispatch = useDispatch();
    const jwt = isLogged();
    const[data, setData] = useState([]);

    useEffect(() => {
        setData(branduserProducts);
    }, [branduserProducts])


    return (
        <div className="row my-5">
            <div className="col-md-8 mx-auto">
                {data && data.map((item, i)=> {
                    return <FinalProduct branduserProduct={item} key={item._id}></FinalProduct>
                })}
            </div>   
        </div>
    )
};



export default MyProductsList;