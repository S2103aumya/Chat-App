const express= require("express");
const router= express.Router();
const {isLoggedIn}=require("../middleware.js");
const {getUserBySearch}= require("../Controllers/user.js");
const {getCurrentchatters}= require("../Controllers/user.js");


router.get("/search",isLoggedIn,getUserBySearch);
router.get("/currentchat",isLoggedIn,getCurrentchatters);

module.exports= router;