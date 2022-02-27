import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from '../helpers/auth';
import { getPostsSameProduct } from './../redux/actions/postActions';




function ProductPage({ posts }) {

    const jwt = isLogged();
    const dispatch = useDispatch();

    const MyComponent = (props) => {

        console.log(props.match.params.id)
    }

    MyComponent();


    useEffect(() => {
        if(jwt) {
            function loadPosts() {
                dispatch(getPostsSameProduct());
            }
            loadPosts()
        } 
    }, [dispatch]);

    console.log(posts);


    return (
        <div className="card mb-2 border">
            <div className="d-flex flex-row justify-content-start">
                <div className="brand">
                    <h1>Product Page</h1>
                </div>
            </div>  
        </div>
    )
}


const mapStateToProps = ({ post: {posts} }) => ({
    posts
})



export default connect( mapStateToProps, null)(ProductPage);
