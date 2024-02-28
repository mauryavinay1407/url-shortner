const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/admin.model");

const verifyJWT = asyncHandler(async (req, res,next) => {
  try {
    const temptoken = req.headers.authorization;
    const token = temptoken.split(" ")[1];
    const verifiedtoken = jwt.verify(token, process.env.SECRET_KEY);

    const admin = await Admin.findById(verifiedtoken.id);
    if (!admin)
      res.status(403).json({
        error: "unauthorized access",
      });
  
      next()
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { verifyJWT };
