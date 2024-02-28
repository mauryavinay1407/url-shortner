const express=require("express");
const router=express.Router();
const {generateURL,getShortURL}=require("../controllers/url.controller");

router.post("/url",generateURL);
router.get("/:id",getShortURL);


module.exports=router;