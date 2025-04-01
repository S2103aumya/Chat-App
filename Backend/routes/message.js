const express= require("express");
const router= express.Router();
const {sendMessage, getMessages}= require("../Controllers/message.js");
const {isLoggedIn}= require("../middleware.js");
const {getMessage}= require("../Controllers/message.js");


router.post("/send/:id",isLoggedIn,sendMessage);
router.get("/:id",isLoggedIn,getMessage);


module.exports= router;
