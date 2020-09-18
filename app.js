const dotenv = require('dotenv');
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
dotenv.config({
  path: '.env'
});
//Connect to database
const db = require('./config/db');
db.connect()
//import routes
const userRoutes = require("./routes/userRoutes")
//Create an instance of express app
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(userRoutes);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on ${port}`));