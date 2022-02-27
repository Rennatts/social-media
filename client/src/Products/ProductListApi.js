import React, { useState, useEffect } from 'react';
import Products from './Products';
import axios from 'axios';


function ProductListApi() {

    const [product, setProduct] = useState();
    const [photo, setPhoto] = useState();
    const [brandinput, setBrandinput] = useState("");
    const [productinput, setProductinput] = useState("");
    const [url, setUrl] = useState("");
    const[success, setSuccess] = useState(false);
    

    function handleFormSubmit(event){
      event.preventDefault();

      const brandrl = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=";
      const brand = brandinput;
      const producturl = "&product_type="
      const product = productinput;
      setUrl(brandrl + brand + producturl + product);

    };


    useEffect(()=> {
        axios.get(url)
        .then(response => {
            setProduct(response.data)
            setSuccess(true);
        })
    }, [url])

    console.log(product);


    return(
      <div>
        <div>
          <form  onSubmit={handleFormSubmit}>
            <input
            onChange={(e)=> setBrandinput(e.target.value)} 
            id= "input"
            type="text" 
            name="brandinput"
            name="brandinput"
            value={brandinput}
            placeholder="brand"
            className="form-control">
            </input>

            <input
            onChange={(e)=> setProductinput(e.target.value)} 
            id= "input"
            type="text" 
            name="productinput"
            name="productinput"
            value={productinput}
            placeholder="product"
            className="form-control">
            </input>

            <button type="submit" className="btn btn-raised btn-primary">Search</button>
          </form>

        </div>

        {success ? (
          <div>
            {product.map((item) => (
              <div key={item.id}>
                <hr></hr>
                <h3>{item.brand}</h3>
                <br></br>
                <h5>{item.name}</h5>
                <br></br>
                <h8>{item.category}</h8>
                <br></br>
                <h8>{item.product_type}</h8>
                <br></br>
                <h10>{item.description}</h10>
                <br></br>
                <img src={item.api_featured_image}></img>
              </div>
            ))}
          </div>
        ): (
          null
        )}
      </div>
    )
};


export default ProductListApi;
