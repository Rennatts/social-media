
import React, { useState } from 'react';
import { isLogged } from '../helpers/auth';
import { useDispatch } from 'react-redux'; 
import { addPost } from '../redux/actions/postActions';
import { Redirect } from 'react-router';



function AddPost(){
    const [post, setPost] = useState({
        brand: "",
        productname: "",
        body: "",
        file: [],
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect]= useState(false);



    const jwt = isLogged();
    const dispatch = useDispatch();

    const postData = new FormData();


    function isValid() {
        const {brand, productname, body, size} = post;
        if(size > 10000) {
            setError("File size should be less than 100kb");
            return false;
        }
        if(brand.length === 0 || productname === 0 || body.length === 0) {
            setError("All fields are required");
            setLoading(false);
            return false;
        }

        return true;
    };


    const handleChange = (name) => (event) => {
        setError("");
        const value = name === 'file' ? event.target.files[0] : event.target.value;

        const size = name  === 'file' ? event.target.files[0].size : 0;
        //postData.set(name, value)
        setPost({...post, [ name ]: value, size});

    };

    function handlefileChange(event){
        setError("");
        const value = event.target.files;

        console.log(value.length)

        function totalsize() {
            const value = event.target.files
            console.log(value);
            var total = 0;
            for (var i = 0; i < value.length; i++) {
              total += event.target.files[i].size;
            }
            return total;
        }

        const size = totalsize();

        setPost({...post, [ event.target.name ]: value, size });

        console.log(post);

    }



    function handleBrandChange(event){
        setError("");
        const value = event.target.value;

        setPost({...post, [ event.target.name ]: value});

    }

    function handleProductNameChange(event){
        setError("");
        const value = event.target.value;

        setPost({...post, [ event.target.name ]: value});

    }

    function handleBodyChange(event){
        setError("");
        const value = event.target.value;

        setPost({...post, [ event.target.name ]: value});

    }


    function handleFormSubmit(event){
        event.preventDefault();

        const userId = jwt.user._id;
        const token = jwt.token;
        const postData = new FormData();

        post.brand && postData.append("brand", post.brand);
        post.productname && postData.append("productname", post.productname);
        post.body && postData.append("body", post.body);

        console.log(post);

        for(let i= 0; i < post.file.length; i++) {
            post.file[i] && postData.append('file', post.file[i])
        };
        

        dispatch(addPost(token, userId, postData));
        setPost({...post, brand: "", productname: "", body: "", file: []});
        setRedirect(true);
        if (redirect){
            return <Redirect to="/" ></Redirect>
        };
        setLoading(false);
    };


    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Create a Review!!</h2>

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
                    <label className="text-muted">Brand</label>
                    <textarea
                    onChange={handleBrandChange} 
                    type="text" 
                    name="brand"
                    required
                    name="brand"
                    value={post.brand}
                    className="form-control"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="text-muted">Product Name</label>
                    <textarea
                    onChange={handleProductNameChange} 
                    type="text" 
                    name="productname"
                    required
                    name="productname"
                    value={post.productname}
                    className="form-control"
                    ></textarea>
                </div>
            

                <div className="form-group">
                    <label className="text-muted">Text</label>
                    <textarea 
                    name="body"
                    onChange={handleBodyChange}  
                    type="text" 
                    name= "body"
                    required
                    value={post.body}
                    className="form-control"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-raised btn-primary">Submit</button>        
            </form>
            
        </div>
    )
};

export default AddPost;

