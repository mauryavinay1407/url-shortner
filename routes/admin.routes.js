const express=require("express");
const router=express.Router();
const {loginAdmin,signupAdmin,logoutAdmin,visitHistory}=require("../controllers/admin.controller")
const {verifyJWT}=require("../middlewares/auth.middleware")

router.post("/signup",signupAdmin);
router.post("/login",loginAdmin);
router.post("/logout",verifyJWT,logoutAdmin);
router.get("/analytics/clicks",verifyJWT,visitHistory);




module.exports=router;