const multer = require('multer')
const randomstring = require('randomstring')
let storage = multer.diskStorage({
  //-------------------------------logic to upload images at destination
  destination: (req, file, cb) => {
    cb(null, 'api/uploads/')
  },
  //-------------------------------logic t
  filename: (req, file, cb) => {
    let val = file.originalname
    let val1 = val.split(".")
    // let temp = new Date()
    // let date1 = temp.getDate()
    // let month1 =temp.getMonth()
    // let year1 = temp.getFullYear()
    // let time1 = temp.getTime()
    // let value = date1+'-'+month1+'-'+year1+'-'+time1
    cb(null, val)
    // console.log(val)
  }
})

let upload = multer({ //multer settings
  storage: storage,
  //-------------------------------logic to upload only images and video
  fileFilter: (req, file, cb) => {
    // console.log(file.mimetype)
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp" || file.mimetype === "image/gif" || file.mimetype === "video/mp4" || file.mimetype === "video/ogg" || file.mimetype === "video/webm") {
      cb(null, true)
    } else {
      var newError = new Error("file type is incorrect")
      newError.name == "multerError"
      cb(newError, false)
    }
  },
  limits: {
    // fileSize: 1024 * 1024 * 10
  }
})



//  console.log(storage.filename)


module.exports = upload