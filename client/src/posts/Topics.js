import React, { useState, useEffect, Component } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import { getAllPosts} from '../redux/actions/postActions';
import { Link } from 'react-router-dom';


function Topic({ posts }) {

    let [dataFromSearch, setDataFromSearch] = useState("");
    let [success, setSuccess] = useState(false);



    const jwt = isLogged();
    const dispatch = useDispatch();


    useEffect(() => {
       if(jwt) {
           function loadPosts() {
               dispatch(getAllPosts(jwt.token));
           }
           loadPosts()
       } 
    }, [dispatch]);


    const onChange = (e) => {
        setDataFromSearch(e.target.value)
    
    }


    const filteredData = posts.filter(post => {
        console.log(post);
        return post.brand.toLowerCase() && post.productName.toLowerCase() && post.body.toLowerCase().includes(dataFromSearch.toLowerCase());
        setSuccess(true);
    });

    console.log(filteredData)


    if(!jwt){
        return(
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-8 mx-auto">
                        <div className="alert alert-info">
                            <Link to="/signin">Log In to have access to all the posts</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };



    return (
        <div>
            <header>
            <Link to="/most_liked"><button>Most liked posts</button></Link>
            
            <Link to="/most_commented"><button>Most commented posts</button></Link>
            </header>

            <header>
                <form className="search-topic-wrapper"> 
                    <input
                        placeholder="Search for..."
                        value={dataFromSearch}
                        onChange={onChange}
                    />
                </form>

                <div className="card-header bg-light">{filteredData.map(i => 
                <Link to ={`/post/${i._id}`}>
                    <div className="card-footer">
                        <div className= "d-flex flex-row justify-content-center align-items-center">
                            <br></br>
                            <p>{i.brand}</p>
                            <br></br>
                            <p>{i.productName}</p>
                            <br></br>
                        </div>
                        <div className = "d-flex flex-row justify-content-center align-items-center">
                            <p>{i.body}</p>
                        </div>
                        <h16 className="d-flex flex-row justify-content-center align-items-center">{i.postedBy.name}</h16>

                        <div className="d-flex flex-row justify-content-center align-items-center">

                        <img 
                        style={{height: "400px", width: "728px"}} 
                        src={`http://localhost:5000/posts/post/photo/${i._id}?${new Date().getTime()}`} 
                        alt={i.photo}></img>
                        </div>
                    </div>
                </Link>
                )}</div>

            </header>
        </div>
    )
}

const mapStateToProps = ({ post: {posts} }) => ({
    posts
})

export default connect(mapStateToProps, null)(Topic);

