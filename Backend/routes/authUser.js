const express= require("express");
const router= express.Router();
const { userRegister } = require("../Controllers/authUser.js");
const {userLogin} = require("../Controllers/authUser.js");
const {userLogout} = require("../Controllers/authUser.js");

router.post("/register",userRegister);
router.post("/login",userLogin);
router.post("/logout",userLogout);
router.get("/check", checkAuth);

module.exports= router