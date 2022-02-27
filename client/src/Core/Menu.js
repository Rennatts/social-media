import React from 'react';
import { NavLink, Link, withRouter, useHistory } from 'react-router-dom';
import { isAuthenticated, signout, brandSignout  } from './../auth';


const Menu = ({ currentUser }) => {
    let history = useHistory();

    console.log(isAuthenticated());

    return (
        <div>
            <ul className="nav nav-tabs bg-dark">

                <li className="nav-item">
                    <NavLink 
                        exact to="/" 
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        className="nav-link active" 
                        href="#">Home
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink 
                        exact to="/allusers" 
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        className="nav-link active" 
                        href="#">Users
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink 
                        exact to="/allbrands" 
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        className="nav-link active" 
                        href="#">Brands
                    </NavLink>
                </li>


            <> 
            {!isAuthenticated() && (
            <div>
                
                <li className="nav-item">
                    <NavLink 
                    to="/signup" 
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    className="nav-link" 
                    href="#">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                    to="/signin" 
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    className="nav-link" 
                    href="#">User Sign In</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink 
                    to="/brandsignin" 
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    className="nav-link" 
                    href="#">Company Sign In</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink 
                    to="/brandsignup" 
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    className="nav-link" 
                    href="#">Company Sign Up</NavLink>
                </li>
            </div>
            )}
            </>
            
            <>
            {isAuthenticated().branduser && (
            
            <div>

                <li className="nav-item">
                <Link
                activeStyle={{
                    fontWeight: "bold",
                    color: "#a4f5e5"
                }}
                className="nav-link" 
                onClick={()=> brandSignout(()=> history.push('/'))}>Sign Out</Link>
                </li>

                <li className="nav-item">
                    <NavLink to={`/branduser/${isAuthenticated().branduser._id}`}  
                    className="nav-link"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    href="#">
                    {`${isAuthenticated().branduser.brandname|| isAuthenticated().branduser.branduser.brandname}´s profile`} 
                    </NavLink>  
                </li>

                <li className="nav-item">
                    <NavLink 
                    exact to={`/product/myproducts/${isAuthenticated().branduser._id}`}  
                    className="nav-link"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    href="#">My products
                    </NavLink>  
                </li>

                
                <li className="nav-item">
                    <NavLink to={`/product/create`}  
                    className="nav-link"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    href="#">
                    Add product
                    </NavLink>  
                </li>

            </div> 
            )}
            </>  

            <>
            {isAuthenticated().user && (
            <div>
                <li className="nav-item">
                <Link
                activeStyle={{
                    fontWeight: "bold",
                    color: "#a4f5e5"
                }}
                className="nav-link" 
                onClick={()=> signout(()=> history.push('/'))}>Sign Out</Link>
                </li>

                <li className="nav-item">
                    <NavLink to={`/user/${isAuthenticated().user._id}`}  
                    className="nav-link"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    href="#">
                    {`${isAuthenticated().user.name}´s profile`} 
                    </NavLink>  
                </li>

                <li className="nav-item">
                    <NavLink 
                    exact to={`/posts/allposts`}  
                    className="nav-link"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    href="#">Posts
                    </NavLink>  
                </li>

                
                <li className="nav-item">
                    <NavLink to={`/post/create`}  
                    className="nav-link"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    href="#">
                    Create Post
                    </NavLink>  
                </li>


                <li className="nav-item">
                    <NavLink to={`/rankings`}  
                    className="nav-link"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#a4f5e5"
                    }}
                    href="#">
                    Rankings
                    </NavLink>  
                </li>

            </div> 
            )}
            </> 

            </ul>
        </div>
    )
};


export default withRouter(Menu);