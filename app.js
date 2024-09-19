//imorted requuired modules

const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const bodyparser=require('body-parser');
const dotenv=require('dotenv');

//initializing express app

const app=express();


//configure enviornment variable

dotenv.config();


//importing routers

const userRouter = require('./routes/userrouters');
const homeRouter = require('./routes/homeroute');
const adminRouter = require('./routes/adminroute');

//midleware for parsing requestbodies
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));

//seting the static folder

app.use(express.static('public'));

//setting the view engine to ejs

app.set('viewengine','ejs');

//session configuration

app.use(
  session({
    secret: process.env.SESSION_SECRET || "thekey",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
  })
);

//using the imported routers

app.use(homeRouter);
app.use(userRouter);
app.use(adminRouter);

//connecting to mongodb and server

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL)
.then(()=>{
  console.log("mongodb connected successfully")

app.listen(process.env.PORT || 3000,()=>{
  console.log(`server is running on port ${process.env.PORT || 3000}`)
});
})
.catch((err)=>{
  console.error("mongodb connection error:",err)
});

