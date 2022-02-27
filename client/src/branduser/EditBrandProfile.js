import React, { Component } from 'react';
import { isAuthenticated, updateBrandUser } from './../auth';
import { Redirect} from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';



class EditBrandProfile extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            brandname: "",
            about: "",
            password: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            file: ""
        }
    };

    componentDidMount() {
       this.userData = new FormData()
        const branduserId = this.props.match.params.branduserId;
        fetch(`http://localhost:5000/brandusers/${branduserId}`, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${isAuthenticated().token}`,
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({ 
                    id: data._id, 
                    error: "",
                    about: data.about
                });
            }
        });
    };



    isValid = () => {
        const {brandname, password, fileSize} = this.state
        if(fileSize > 1000000) {
            this.setState({error: "File size should be less than 100kb"});
            return false;
        }
        if(brandname.length === 0) {
            this.setState({error: "Brand Name is required"});
            return false;
        }
        if(password.length >= 1 && password.length <=5) {
            this.setState({error: "Password must be at least 6 characters long"});
            return false;
        }
        return true;
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        const value = name === 'file' ? event.target.files[0] : event.target.value

        const fileSize = name === 'file' ? event.target.files[0].size : 0;
        this.userData.set(name, value)
        this.setState({ [name]: value, fileSize });

    };


    onSubmit = event => {
        event.preventDefault();

        if (this.isValid()){
    
            const branduserId = this.props.match.params.branduserId;
            console.log(branduserId);
            const token = isAuthenticated().token;
            fetch(`http://localhost:5000/brandusers/${branduserId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: this.userData
            })
            .then(res => {
                return res.json()
            })
            .catch(error => console.log(error))
            .then(data => {
                console.log(data);
                if(data.error) {
                    this.setState({ error: data.error })
                } else {
                    updateBrandUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        })
                    })
                };
            }); 
        }
    };



    signupForm = (brandname, password, about) => (
        <form>
            
            <div className="form-group">
                <label className="text-muted">Profile file</label>
                <input 
                onChange={this.handleChange("file")} 
                type="file" 
                accept= "image/*"
                required
                className="form-control">
                </input>
            </div>

            <div className="form-group">
                <label className="text-muted">Brand Name</label>
                <input 
                onChange={this.handleChange("brandname")} 
                type="text" 
                required
                className="form-control"
                value={brandname}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea 
                onChange={this.handleChange("about")} 
                type="text" 
                required
                className="form-control"
                value={about}></textarea>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                onChange={this.handleChange("password")} 
                type="password" 
                required
                className="form-control"
                value={password}></input>
            </div>

            <button onClick={this.onSubmit} className="btn btn-raised btn-primary">Update</button>
                    
        </form>  
    );


    render() {
        const {id, brandname, password, redirectToProfile, error, file, about} = this.state;

        if(redirectToProfile) {
            return <Redirect to={`/branduser/${id}`}></Redirect>
        }
        
        return (
            <div className= "container">
                <h2 className="mt-5 mb-5">Edit Profile {brandname}</h2>
                
                <div 
                className="alert alert-danger" 
                style={{display: error ? "" : "none"}}>{error}
                </div>

                <img 
                style={{height: "200px", width: "auto"}} 
                className= "img-thumbnail"
                src={file}
                onError= {i => (i.target.src= `${DefaultProfile}`)} 
                alt={brandname}
                ></img>


                {this.signupForm(brandname, password, about)}

            </div>
        );
    }
}

export default EditBrandProfile;