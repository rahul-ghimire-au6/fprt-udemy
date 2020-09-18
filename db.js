const mongoose = require("mongoose");

mongoose
.connect(process.env.MONGODB_URI.replace("<password>", process.env.MONGODB_PASSWORD).replace("<dbname>","udemy"),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err.message));
