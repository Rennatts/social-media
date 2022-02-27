const express = require("express");
const router = express.Router();
const branduserById  = require("../functions/brandauthFunctions/branduserById");
const allBrandUsers = require("../functions/branduserFunctions/allBrandUsers");
const getBrandUser = require("../functions/branduserFunctions/getBrandUser");
const updateBrandUser = require("../functions/branduserFunctions/updateBrandUser");
const deleteBrandUser = require('../functions/branduserFunctions/deleteBrandUser');
//const brandUserPhoto = require("../functions/branduserFunctions/brandUserPhoto");
const authentication = require("../helpers/authentication");
const hasAuthorizationBrand = require("../functions/brandauthFunctions/hasAuthorizationBrand");
const requireSigninBrand = require("../functions/brandauthFunctions/requireSigninBrand");
const likeBranduser = require('../functions/branduserFunctions/likeBranduser');
const unlikeBranduser = require('../functions/branduserFunctions/unlikeBranduser');
const userById = require("../functions/authFunctions/userById");



const multer = require("multer");
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
const multerConfig = require('./../multer');



router.get("/allbrandusers", allBrandUsers);
router.get("/:branduserId", getBrandUser);
router.put("/:branduserId", requireSigninBrand, multer(multerConfig).single("file"), updateBrandUser);
router.delete("/delete/:branduserId", requireSigninBrand, authentication, deleteBrandUser);



//like & unline brands
router.put("/likebrand/:branduserId/:userId", likeBranduser);
router.put("/unlikebrand/:branduserId/:userId", unlikeBranduser);


//photo
//router.get("/photo/:branduserId", brandUserPhoto);


//any route containing :userId, our app will first execute userById()
router.param("branduserId", branduserById);


router.param("userId", userById);




module.exports = router;