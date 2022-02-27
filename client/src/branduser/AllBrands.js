import React, { useEffect, useState }  from 'react';
import { useDispatch, connect } from 'react-redux';
import { isLogged } from '../helpers/auth';
import { getAllBrandUsers } from '../redux/actions/branduserActions';
import {Link} from 'react-router-dom';
import { isAuthenticated } from './../auth/index';



function Users({ brandusers, userError }) {
    const dispatch = useDispatch();  
    const jwt = isLogged();

    const [error, setError] = useState(null);
    
    useEffect(() => {
        if ( userError && userError !== null ) {
            setError(userError);
        }
        dispatch(getAllBrandUsers(jwt && jwt.token));
    }, [dispatch, userError]);


    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    };


    return (
        <div className="container">
            <div className="row my-4">
                <div className="cold-md-8 mx-auto">
                    {showError()}
                    <div className="card p-2">
                        <div className="card-header bg-white">
                            <h3 className="card-title">
                                Profiles
                            </h3>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {isAuthenticated().branduser && (
                                    brandusers.brandusers && brandusers.brandusers.map((branduser, index) => (
                                        <li className="list-group-item d-flex flex-row justify-content-between align-items-center" key={index}>
                                            <Link 
                                            to={`/branduser/${branduser._id}`} 
                                            style={{textDecoration: "none"}}
                                            key={index}>
                                            
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <img 
                                                src={branduser.url} 
                                                width="50" 
                                                height="50" 
                                                className="img-fluid rounded pr-2"
                                                alt= {branduser.brandname}
                                                ></img>
                                                <h4 className="mt-3">{branduser.brandname}</h4>
                                            </div>
                                            </Link>
                                        </li>
                                        
                                    ))
                                )}
                                
                                {isAuthenticated().user && (
                                    brandusers.brandusers && brandusers.brandusers.map((branduser, index) => (
                                        <li className="list-group-item d-flex flex-row justify-content-between align-items-center" key={index}>
                                            <Link 
                                            to={`/brands/${branduser._id}`} 
                                            style={{textDecoration: "none"}}
                                            key={index}>
                                            
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <img 
                                                src={branduser.url} 
                                                width="50" 
                                                height="50" 
                                                className="img-fluid rounded pr-2"
                                                alt= {branduser.brandname}
                                                ></img>
                                                <h4 className="mt-3">{branduser.brandname}</h4>
                                            </div>
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

};



const mapStateToProps = ({ branduser: { brandusers, userError  }}) => ({
    brandusers,
    userError
});


export default connect( mapStateToProps, null )(Users);