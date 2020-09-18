const Uploader = require('./model/uploaderModel')
const Client = require('./model/clientModel')
const Video = require("./model/videoModel")
const Order = require("./model/orderModel")
const jwt = require("jsonwebtoken");
const bufferToString = require("./controllers/fileUpload/bufferToString/bufferToString")
const cloudinary = require("./controllers/fileUpload/cloudinary/cloudinary")
const stripe = require("stripe")(process.env.STRIPE_SEC);
const { v4: uuid } = require('uuid');


module.exports = {
    uploaderRegister:async(req,res)=>{
        try{
        const newuser = await Uploader.create({...req.body})
        console.log(newuser)
        return res.status(200).json({newuser})
        }catch(err){
            return res.status(400).json({err:err.message})
        }
    },
    clientRegister:async(req,res)=>{
        try{
        const newuser = await Client.create({...req.body})
        console.log(newuser)
        return res.status(200).json({newuser})
        }catch(err){
            return res.status(400).json({err:err.message})
        }
    },
    uploaderLogin:async (req,res)=>{
        try {
            const { email, pass} = req.body;
            const user = await Uploader.findOne({email,pass})
            if(user.name!==null){
                const token = jwt.sign({ user }, "secret", {
                    expiresIn: "1h"
                  });
                return res.status(200).json({token, admin:user.admin})
            }
          } catch (err) {
            return res.status(401).json({ msg: err.message });
          }
    },
    checkLogin:async(req,res)=>{
        try{
            const {token} = req.body
            const data = jwt.verify(token,'secret')
            if(data.user.name!==undefined){
                return res.status(200).json({message:data.user})
            }
            return res.status(401).json({message:"invalid token"})
        }catch(err){
            return res.status(400).json({err:err.message})
        }
    },
    clientLogin:async (req,res)=>{
        try {
            const { email, pass} = req.body;
            const user = await Client.findOne({email,pass})
            if(user.name!==null){
                const token = jwt.sign({ user }, "secret", {
                    expiresIn: "1h"
                  });
                return res.status(200).json({token, admin:user.admin})
            }
          } catch (err) {
            return res.json({ msg: err.message });
          }
    },
    videoUpload:async(req,res)=>{

        try{
            const { originalname, buffer } = req.file
            const {title, cat,price,token} = req.body
            const data = jwt.verify(token,'secret')
            // console.log(data)
            if(data.user!==undefined){
                const imageContent = bufferToString( originalname, buffer)
                const {secure_url} = await cloudinary.v2.uploader.upload(imageContent, 
                    { resource_type: "video", 
                    chunk_size: 6000000,
                    eager: [
                        { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
                        { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
                    eager_async: true,
                    eager_notification_url: "https://mysite.example.com/notify_endpoint" });
                const video = await Video.create({title,cat,price,owner:data.user._id,url:secure_url})
                return res.status(200).json({msg:'upload success'})
            }
                
            return res.status(200).json({msg:"invalid token"})
        }catch(err){
            return res.status(200).json({msg:err.message})
        }
    },
    getMyVideo:async(req,res)=>{
        try{
            const {token} = req.body
            const data = jwt.verify(token,'secret')
            const videos = await Video.find({owner:data.user._id})
            return res.status(200).json({videos})
        }catch(err){
            return res.status(401).json({msg:err.message})
        }
    },
    getAllVideo:async(req,res)=>{
        try{
            const data = await Video.find()
            return res.status(200).json({data})
        }catch(err){
            res.status(400).json({err:err.message})
        }
    },
    checkOut:async (req, res) => {
        // console.log("Request:", req.body);
      
        let error;
        let status;
        try {
          const { product, token,userToken,videoId } = req.body;
          const data = jwt.verify(userToken,'secret')
          if(data.user.name!==undefined){
            const customer = await stripe.customers.create({
              email: token.email,
              source: token.id
            });
        
            const idempotencyKey = uuid();
            const charge = await stripe.charges.create(
              {
                amount: product.price * 100,
                currency: "inr",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the ${product.name}`,
                shipping: {
                  name: token.card.name,
                  address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                  }
                }
              },
              {
                idempotencyKey
              }
            );
            await Order.create({owner:data.user._id,videoId})
            status = "success";
            return res.status(200).json({charge})
          }
        } catch (err) {
          status = "failure";
          return res.status(400).json({msg:err.message})
        }
      },
  getMyList:async (req,res)=>{
    const {token} = req.body
    try{
      const data = jwt.verify(token,'secret')
      if(data.user!==undefined){
        console.log(data.user._id)
        const orders = await Order.find({owner:data.user._id})
        console.log(orders)
        return res.status(200).json({orders})
      }
    }catch(err){
      return res.status(401).json({msg:err.message})
    }
  }
}