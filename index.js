const {app}=require("./app");
const {connectDB}=require("./db/index")
const dotenv=require('dotenv')
dotenv.config({path:"./.env"})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||4001,()=>console.log("Server is started at http://localhost:4001"));
})
.catch((err)=>{
    console.log("MONGO DB connection is failed!!!");
})