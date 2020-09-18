const Uploader = require('./model/uploaderModel')
const Client = require('./model/clientModel')
const Video = require("./model/videoModel")
const jwt = require("jsonwebtoken");
const bufferToString = require("./controllers/fileUpload/bufferToString/bufferToString")
const cloudinary = require("./controllers/fileUpload/cloudinary/cloudinary")


module.exports = {
    getMyVideo:async(req,res)=>{
        try{
            const {token} = req.body
            const data = jwt.verify(token,'secret')
            const videos = await Video.find({owner:data.user._id})
            return res.status(200).json({videos})
        }catch(err){
            return res.status(401).json({msg:err.message})
        }
    }
}