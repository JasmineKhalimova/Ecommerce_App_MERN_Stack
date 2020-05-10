const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); //for authorizationß
const { errorHandler } = require("../helpers/dbErrorHandler");

// user signup method
exports.signup = (req, res) => {
    //console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) =>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        } 
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

// user signin method
exports.signin = (req, res) => {
    //find the user based on email
    const { email, password } = req.body;
    User.findOne({ email },(err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User with this email does not exist. Please signup"
            });
        }

        // if user is found make sure the email and password matches
        // create authernticate method
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and passoword do not match"
            });
        }

        //generate a signed token with user id and secret key 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        
        //presist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });

        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

// user signout method
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({message: "signout is success"});
};

// prodtected method for signed in users 
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});