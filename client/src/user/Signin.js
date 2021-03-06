import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { signin } from './../redux/actions/userActions';

import {
    TOGGLE_SUCCESS
} from '../redux/types/userTypes';




function Signup ({ userError, userSuccess }) {
    const[ user, setUser ] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    const {email, password} = user;

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        if ( userError && userError !== null ) {
            setError(userError);
        }
        if(userSuccess) {
            setSuccess(userSuccess);
            dispatch({type: TOGGLE_SUCCESS})
        }
    }, [userError, userSuccess, dispatch]);


    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    };


    function redirectUser(){
        return success && <Redirect to="/"></Redirect>

    };


    function handleInputChange(event) {
        setUser({...user, [event.target.name]: event.target.value});
    };
    

    function handleFormSubmit(event){
        event.preventDefault();
        dispatch(signin(user));
    };




    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Signup</h2>

            {showError()}

            {redirectUser()}

            {error && (error !== null || error !== "" || error !== {}) && (
            <div>Something went wrong...</div>
          )}

            <form>

                <div className="form-group">
                    <label className="text-muted">email</label>
                    <input 
                    onChange={(event)=> handleInputChange(event)} 
                    type="email" 
                    name= "email"
                    required
                    className="form-control"
                    value={email}></input>
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input 
                    onChange={(event)=> handleInputChange(event)} 
                    type="password" 
                    name= "password"
                    required
                    className="form-control"
                    value={password}></input>
                </div>

                <button onClick={handleFormSubmit} className="btn btn-raised btn-primary">Submit</button>
                
            </form>
            
        </div>
    )
};


const mapStateToProps = ({user: {userError, userSuccess}}) => ({
    userError,
    userSuccess

});


export default connect(mapStateToProps, null)(Signup);