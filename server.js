require('dotenv').config()
require('./db');
const post = require('./post')
const morgan = require('morgan')
const express = require('express')
const multer = require("multer")
const upload =  multer()
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.post('/uploadregister',post.uploaderRegister)
app.post('/clientregister',post.clientRegister)
app.post('/uploaderlogin',post.uploaderLogin)
app.post('/clientlogin',post.clientLogin)
app.post('/videoupload',upload.single("myFile"),post.videoUpload)
app.post('/checklogin',post.checkLogin)
app.post('/getmyvideo',post.getMyVideo)
app.post("/getallvideo",post.getAllVideo)
app.post("/checkout", post.checkOut);
app.post('/getmylist',post.getMyList)


const Port = process.env.PORT || 5000
app.listen(Port,()=>console.log('server running on',Port))