const express = require("express");
const router = express.Router();
const { createProductValidator } = require("./../helpers/index");
const branduserById  = require("../functions/brandauthFunctions/branduserById");
const createProduct = require('../functions/productsFunctions/createProduct');
const getProducts = require("../functions/productsFunctions/getProducts");
const requireSigninBrand = require("../functions/brandauthFunctions/requireSigninBrand")
const productsByBrand = require("../functions/productsFunctions/productsByBrand");
const isPoster = require("../functions/productsFunctions/isPoster");
const productById = require("../functions/productsFunctions/productById");
const deleteProduct = require("../functions/productsFunctions/deleteProduct");
const productPhoto = require("../functions/productsFunctions/productPhoto");
const getProductById = require("../functions/productsFunctions/getProductById");
const likeProduct = require("../functions/productsFunctions/likeProduct");
const unlikeProduct = require("../functions/productsFunctions/unlikeProduct");
const authentication = require("../helpers/authentication");
const searchProduct = require("../functions/productsFunctions/searchProduct");
const getProductPage = require("../functions/productsFunctions/getProductPage");

const multer = require("multer");
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
const multerConfig = require('./../multer');


//star & unstar
router.put("/product/likeproduct", requireSigninBrand, likeProduct);
router.put("/product/unlikeproduct", requireSigninBrand, unlikeProduct);


router.post("/create/:branduserId", multer(multerConfig).array("file"), createProduct, createProductValidator);
router.get("/allproducts", getProducts);
router.get("/productsby/:branduserId", requireSigninBrand, productsByBrand);
router.delete("/:productId", requireSigninBrand, isPoster, deleteProduct);

router.get("/single_product/:productId", requireSigninBrand, getProductById);

router.put("/search_for_post", requireSigninBrand, searchProduct);


router.get("/productpage", getProductPage);

//router.get("/products_by_branduser/:branduserId", requireSigninBrand, getPro)



//photo
router.get("/photo/:productId", productPhoto);

//any route containing :userId, our app will first execute userById()
router.param("branduserId", branduserById);

//any route containing :postId, our app will first execute postById()
router.param("productId", productById)




module.exports = router;