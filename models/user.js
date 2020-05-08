const mongoose = require("mongoose")//db connection
const crypto = require("crypto")//to hash the password
const uuidv1 = require("uuid/v1")//to generate unique strings

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password:{
        type: String,
        required: true,
    },
    about:{
        type: String,
        trim: true,
    },
    salt: String,

    role:{
        type: Number,
        default: 0,
    },
    history:{
        type: Array,
        default: 0
    }
},
    {timestamps: true}
);
