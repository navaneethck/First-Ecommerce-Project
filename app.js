const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const bodyparser = require("body-parser");
const userRouter = require("./routes/userrouters");
const homeRouter= require("./routes/homeroute");
const adminRouter=require("./routes/adminroute");


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

require("dotenv").config();

app.use(express.static("public"));
app.set("view engine", "ejs");




app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(homeRouter);
app.use(userRouter);
app.use(adminRouter)



const mongoURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoURL)
  .then((data) => {
    console.log("mongo connected successful")
    app.listen(process.env.PORT, () => {
      console.log("server is running oN PORT");
    });
  })
  .catch((err) => {
    console.log(err);
  });
