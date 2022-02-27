import React, { useState } from 'react';
import { isLogged } from '../helpers/auth';
import { useDispatch } from 'react-redux'; 
import { addProduct  } from '../redux/actions/productAction';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';


function CreateProduct(){
    const [products, setProducts] = useState({
        productname: "",
        category: "",
        description: "",
        file: [],
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    let history = useHistory();

    const jwt = isLogged();
    const dispatch = useDispatch();


    function isValid() {
        const {productname, category, description, fileSize} = products;
        if(fileSize > 10000000) {
            setError("File size should be less than 100kb");
            return false;
        }
        if(productname.length === 0 || category.length === 0 || description.length === 0) {
            setError("All fields are required");
            setLoading(false);
            return false;
        }

        return true;
    };



    function handlefileChange(event){
        setError("");
        const value = event.target.files;

        function totalsize() {
            const value = event.target.files
            var total = 0;
            for (var i = 0; i < value.length; i++) {
              total += event.target.files[i].size;
            }
            return total;
        }

        const size = totalsize();

        setProducts({...products, [ event.target.name ]: value, size});

        console.log(products);

    }


    function handleProductNameChange(event){
        setError("");
        const value = event.target.value;

        setProducts({...products, [ event.target.name ]: value});

    }

    function handleCategoryChange(event){
        setError("");
        const value = event.target.value;

        setProducts({...products, [ event.target.name ]: value});

    }

    function handleDescriptionChange(event){
        setError("");
        const value = event.target.value;

        setProducts({...products, [ event.target.name ]: value});

        console.log(products);

    }


    function handleFormSubmit(event){
        event.preventDefault();

        const branduserId = jwt.branduser._id;
        const token = jwt.token;
        const postData = new FormData();

        products.productname && postData.append("productname", products.productname);
        products.category && postData.append("category", products.category);
        products.description && postData.append("description", products.description);

        for(let i= 0; i < products.file.length; i++) {
            products.file[i] && postData.append('file', products.file[i])
        };

        dispatch(addProduct(token, branduserId, postData));
        setProducts({...products, productname: "", category: "", description: "", file: []});
        setRedirect(true);
        if (redirect){
            return <Redirect to="/" ></Redirect>
        };
        setLoading(false);
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Add a product</h2>

            <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
                    <div className="form-group">
                        <label className="text-muted">Add images</label>
                        <input 
                        onChange={handlefileChange} 
                        type="file" 
                        multiple
                        accept= "image/*"
                        name="file"
                        className="form-control">
                        </input>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Product name</label>
                        <textarea
                        onChange={handleProductNameChange} 
                        type="text" 
                        name="productname"
                        required
                        name="productname"
                        value={products.productname}
                        className="form-control"
                        ></textarea>
                    </div>

                    
                    <div className="form-group">
                        <label className="text-muted">Category</label>
                        <textarea 
                        name="category"
                        onChange={handleCategoryChange}  
                        type="text" 
                        name= "category"
                        required
                        value={products.category}
                        className="form-control"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Product description</label>
                        <textarea 
                        name="description"
                        onChange={handleDescriptionChange}  
                        type="text" 
                        name= "description"
                        required
                        value={products.description}
                        className="form-control"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-raised btn-primary">Submit</button>        
            </form>
        </div>
    )
};


export default CreateProduct;