import React, {useEffect} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Home from './Core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './Core/Menu';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import { useDispatch, connect } from 'react-redux';
import { authCheck } from './redux/actions/userActions';
import AllPosts from './posts/AllPosts';
import AddPost from './Core/AddPost';
import Topics from './posts/Topics';
import SinglePostList from './Core/SinglePostList';
import Likes from './LikesRanking/Likes';
import Comments from './commentsRanking/Comments';
import ProductListApi from './Products/ProductListApi';
import AddReview from './Core/AddReview';
import ProductPage from './Core/ProductPage';
import BrandSignup from './branduser/BrandSignup';
import BrandSingin from './branduser/BrandSignin';
import EditBrandProfile from './branduser/EditBrandProfile';
import CreateProduct from './Products/CreateProduct';
import MyProducts from './Products/MyProducts';
import FindProduct from './Products/FindProduct';
import AllProducts from './Products/AllProducts';
import AllProductsUser from './ProductsUser/AllProductsUser';
import FindProductUser from './ProductsUser/FindProductUser';
import AllBrands from './branduser/AllBrands';
import BrandUserProfileforUsers from './branduser/BrandUserProfileforUsers';
import BrandUserProfile from './branduser/BrandUserProfile';



function MainRouter({ currentUser }){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheck());
    },[dispatch])

    
    return (
        <div>
            <Router>
                <Menu currentUser={ currentUser && currentUser }></Menu>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/signup" component={Signup}></Route>
                    <Route exact path="/brandsignup" component={BrandSignup}></Route>
                    <Route exact path="/signin" component={Signin}></Route>
                    <Route exact path="/brandsignin" component={BrandSingin}></Route>
                    <Route exact path="/user/:userId" component={Profile}></Route>
                    <Route exact path="/brands/:branduserId" component={BrandUserProfileforUsers}></Route>
                    <Route exact path="/branduser/:branduserId" component={BrandUserProfile}></Route>
                    <Route exact path="/allusers" component={Users}></Route>
                    <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute> 
                    <PrivateRoute exact path="/brandusers/edit/:branduserId" component={EditBrandProfile}></PrivateRoute>
                    <PrivateRoute exact path="/post/create" component={AddPost}></PrivateRoute> 
                    <PrivateRoute exact path="/product/create" component={CreateProduct}></PrivateRoute>
                    <PrivateRoute exact path="/product/myproducts/:branduserId" component={MyProducts}></PrivateRoute>
                    <Route exact path="/posts/allposts" component={AllPosts}></Route>
                    <Route exact path="/rankings" component={Topics}/>    
                    <Route exact path="/post/:postId" component={SinglePostList}></Route>
                    <Route exact path="/most_liked" component={Likes}></Route>
                    <Route exact path="/most_commented" component={Comments}></Route>
                    <Route exact path="/apiproducts" component={ProductListApi}></Route>
                    <Route exact path="/createreview" component={AddReview}></Route>
                    <Route exact path="/productPage" component={ProductPage}></Route>
                    <Route exact path="/findproduct" component={FindProduct}></Route>
                    <Route exact path="/allproducts" component={AllProducts}></Route>
                    <Route exact path="/allproductsuser" component={AllProductsUser}></Route>
                    <Route exact path="/findproductuser" component={FindProductUser}></Route>
                    <Route exact path="/allbrands" component={AllBrands}></Route>
                </Switch>
            </Router>
        </div>
    )

};


const mapStateToProps = ( {user: {currentUser}} ) => ({
    currentUser
})

export default connect(mapStateToProps, null )(MainRouter);