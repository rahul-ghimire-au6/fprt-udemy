const fs = require('fs');

//Middleware to create upload folder if not present 
module.exports = {
   authFolder: async (req, res, next) => {
      //creation of upload folder if not present
      fs.readdir('.', (err, data) => {
         if (err) {
            console.log(err)
         }
         else {
            //    console.log(data)
            if (data.includes('uploads')) {
               //   console.log('upload folder is present')
               next()
            } else {
               //   console.log('upload folder is not present')
               fs.mkdirSync('uploads')
               setTimeout(() => {
                  //  console.log('upload folder created')
                  next()
               }, 1500)

            }
         }
      })
      //end
   }
}

