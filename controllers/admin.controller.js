const {asyncHandler}=require("../utils/asyncHandler");
const {adminFormat}=require("../utils/zodValidation");
const {Admin}=require("../models/admin.model");
const {URL}=require("../models/url.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const signupAdmin=asyncHandler(async(req,res)=>{
     const {firstName,lastName,email,password}=req.body;

     const {success}=adminFormat.safeParse(req.body);
      if(!success)
      res.status(401).json({
    error:"Please enter data in given format"});

    if([firstName,lastName,email,password].some((data)=>data?.trim()===""))
    throw new Error("Please fill all the fields");

    const existAdmin=await Admin.findOne({email});

    if(existAdmin)
     res.status(403).json({error: "admin with this username already exists, kindly try login"});
    
     const encryptedPassword=await bcrypt.hash(password,10);
     const savedAdmin=await Admin.create({
        firstName,
        lastName,
        email,
        password:encryptedPassword
     })
     savedAdmin.password=undefined;
     res.status(201).json(savedAdmin);

})

const loginAdmin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
     
    if(!(email && password))
    res.status(403).json({error:"Enter the both email and password"});

    const isAdminExist=await Admin.findOne({email:email});
    
    if(!isAdminExist)
    res.status(401).json({error: "Admin doesn't exist ,try signup first"});

     const checkedAPassword=await bcrypt.compare(password,isAdminExist.password);

     if(!checkedAPassword)
     throw new Error("You've entered wrong password");

     const token=jwt.sign({id:isAdminExist._id},process.env.SECRET_KEY);
   
     res.status(201).set('Authorization',`Bearer ${token}`).json({
        msg:"Successfully logged in"
     })

})

const logoutAdmin=asyncHandler(async(req,res)=>{
   res.status(201).json({
    msg:"Logged out successfully"});
})

const visitHistory=asyncHandler(async(req,res)=>{
    const {domain}=req.body;
    
    const history=await URL.findOne({redirectURL: domain});
    console.log(history);
    if(!history)
    res.status(401).json({error:"There is no clicks for this website"});

    res.status(201).json({
        totalClicks: history.visitInfo.length,
        analytic: history.visitInfo
    })

})

module.exports={signupAdmin,loginAdmin,logoutAdmin,visitHistory};