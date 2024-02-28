const { asyncHandler } = require("../utils/asyncHandler");
const {URL} = require("../models/url.model");
const shortid=require("shortid");

const generateURL = asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url)
    res.status(401).json({
      error: "URL is required",
    });
  const shortId=shortid();
  await URL.create({
    shortId,
    redirectURL:url,
    visitInfo:[]
  })

  res.status(201).json({
    Id:shortId
  })

});


const getShortURL=asyncHandler(async(req,res)=>{
    const shortId=req.params.id;
    const url=await URL.findOne({shortId});
    if(!url)
    res.status(401).json({error:"incorrect id!!!"});
    
    const shortIdInfo=await URL.findOneAndUpdate({shortId},{
        $push: {
            visitInfo: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(shortIdInfo.redirectURL);

})


module.exports = { generateURL,getShortURL };
