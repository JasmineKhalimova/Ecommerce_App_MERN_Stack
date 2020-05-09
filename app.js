//require statements
const express = require("express");
const mongoose = require("mongoose");// DB connection
const morgan = require("morgan");// using morgan as middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");// to save user credentials in the cookie
const expressValidator = require("express-validator");// to validate user credentials


require("dotenv").config();

// importing routes
const userRoutes = require("./routes/user");//user routes

//app
const app = express();

//DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>console.log('DB Connected'));

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//Routes
app.use("/api", userRoutes); //using user routes

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});