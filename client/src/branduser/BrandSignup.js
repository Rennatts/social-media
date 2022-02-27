import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { brandSignup } from '../redux/actions/branduserActions';

import {
    TOGGLE_SUCCESS
} from '../redux/types/userTypes';




function Signup ({ userError, userSuccess }) {
    const[ user, setUser ] = useState({
        brandname: "",
        email: "",
        password: "",
        city: "",
        state: "",
        address: "",
        zip_code: "",

    });

    const dispatch = useDispatch();

    const {brandname, email, password, city, state, address, zip_code} = user;

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



    function redirectUser(){
        return success && <Redirect to="/brandsignin"></Redirect>

    };


    function handleInputChange(event) {
        setError("");
        setUser({...user, [event.target.name]: event.target.value});
    };

    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    };
    

    function handleFormSubmit(event){
        event.preventDefault();
        dispatch(brandSignup(user));
    };




    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Signup</h2>

            {showError()}

            {redirectUser()}

            <form>
                <div className="form-group">
                    <label className="text-muted">Nome da marca</label>
                    <input 
                    onChange={(event)=> handleInputChange(event)} 
                    type="text" 
                    name="brandname"
                    required
                    className="form-control"
                    value={brandname}></input>
                </div>

                <div className="form-group">
                    <label className="text-muted">Cidade</label>
                    <input 
                    onChange={(event)=> handleInputChange(event)} 
                    type="text" 
                    name="city"
                    required
                    className="form-control"
                    value={city}></input>
                </div>

                <div className="form-group">
                    <label className="text-muted">Estado</label>
                    <input 
                    onChange={(event)=> handleInputChange(event)} 
                    type="text" 
                    name="state"
                    required
                    className="form-control"
                    value={state}></input>
                </div>

                <div className="form-group">
                    <label className="text-muted">Endereço</label>
                    <input 
                    onChange={(event)=> handleInputChange(event)} 
                    type="text" 
                    name="address"
                    required
                    className="form-control"
                    value={address}></input>
                </div>

                <div className="form-group">
                    <label className="text-muted">CEP</label>
                    <input 
                    onChange={(event)=> handleInputChange(event)} 
                    type="text" 
                    name="zip_code"
                    required
                    className="form-control"
                    value={zip_code}></input>
                </div>

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


const mapStateToProps = ({branduser: {userError, userSuccess}}) => ({
    userError,
    userSuccess

});


export default connect(mapStateToProps, null)(Signup);