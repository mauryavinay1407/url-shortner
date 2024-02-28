const {z}=require("zod");

const adminFormat=z.object({
  firstName:z.string(),
  lastName:z.string(),
  email:z.string().email(),
  password:z.string().min(6)  
})

module.exports={adminFormat};