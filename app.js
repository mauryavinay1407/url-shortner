const express=require('express');
const app=express();
const urlRouter=require("./routes/url.routes");
const adminRouter=require("./routes/admin.routes");

app.use(express.json());

app.use("/api/v1",urlRouter);
app.use("/api/v1/admin",adminRouter);

module.exports={app};