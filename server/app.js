const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv");


const { json } = require("express");

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config();

//Connect Database
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//Middleware
require('./models/user')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


app.listen(PORT, ()=>{
    console.log("Server is running on", PORT )
})