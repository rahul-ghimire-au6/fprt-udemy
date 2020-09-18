const mongoose = require("mongoose");


module.exports = {
  connect: function () {
      mongoose
        .connect(process.env.MONGODB_URI.replace("<password>", process.env.MONGODB_PASSWORD).replace("<dbname>","udemy"), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        })
        .then(function () {
          console.log("Database connected successfully");
        })
        .catch(function (err) {
          console.log(err.message);
        });
  },
  disconnect: function(){
    console.log('Database Disconnected Successfully')
    mongoose.disconnect();
  }
}


