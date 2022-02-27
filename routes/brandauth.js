const express = require("express");
const router = express.Router();
const { branduserSignupValidator } = require("./../helpers/index");
const signup = require('./../functions/brandauthFunctions/signup');
const signin = require('./../functions/brandauthFunctions/signin');
const signout = require('./../functions/brandauthFunctions/signout');
const branduserById  = require("../functions/brandauthFunctions/branduserById");



router.post("/signup", branduserSignupValidator, signup);

router.post("/signin", signin);

//signout
router.get("/signout", signout);


//any route containing :userId, our app will first execute userById()
router.param("branduserId", branduserById);


module.exports = router;