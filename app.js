//require statements
const express = require("express");
const mongoose = require("mongoose");// DB connection
const morgan = require("morgan");// using morgan as middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");// to save user credentials in the cookie
const expressValidator = require("express-validator");// to validate user credentials
const cors = require("cors");// to handle api request from different origin

require("dotenv").config();

// importing routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

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
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});