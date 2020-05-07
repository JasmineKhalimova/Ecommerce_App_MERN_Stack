//required statements
const express = require("express");
const mongoose = require("mongoose");
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

//routes
app.use("/api", userRoutes);//using user routes

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});