import React, { useState, useEffect } from 'react';
import { isLogged } from '../helpers/auth';
import { useDispatch, connect } from 'react-redux';
import { searchProduct } from '../redux/actions/productAction';
import FinalProduct from './FinalProductUser';


function FindProduct({ product }) {

  const jwt = isLogged();
  const token = jwt.token;
  const dispatch =  useDispatch();

  const [data, setData] = useState({
    searchBrand: "",
    searchProductname: ""
  });


  function handleBrandChange(event){
    const value = event.target.value;

    setData({...data, [ event.target.name ]: value});
  }

  function handleProductChange(event){
    const value = event.target.value;

    setData({...data, [ event.target.name ]: value});
  }

  function handleFormSubmit(event){
    const {searchBrand, searchProductname} = data;
    event.preventDefault();
    dispatch(searchProduct(token, searchBrand, searchProductname));
    
  };

    return(
      <div>
        <div>
          <form  onSubmit={handleFormSubmit}>
            <input
            onChange={handleBrandChange} 
            id= "input"
            type="text" 
            name="searchBrand"
            value={data.searchBrand}
            placeholder="brand"
            className="form-control">
            </input>

            <input
            onChange={handleProductChange} 
            id= "input"
            type="text" 
            name="searchProductname"
            value={data.searchProductname}
            placeholder="product"
            className="form-control">
            </input>

            <button type="submit" className="btn btn-raised btn-primary">Search</button>
          </form>

        </div>

        <div>
          {product.map(item => (
            <FinalProduct branduserProduct={item}></FinalProduct>
          ))}
        </div>
      </div>
    )
};

const mapStateToProps = ({ product: { product } }) => ({
  product

});

export default connect(mapStateToProps, null)(FindProduct);