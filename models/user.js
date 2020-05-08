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
        default: []
    }
},
    {timestamps: true}
);

// Virtual fields
userSchema.virtual('password')

// setting password
.set(function(password){
    this._password = password
    this.salt =uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
//getting password
.get(function(){
    return this._password
})

// creating encryptPassword method and adding to user schema
userSchema.methods = {
    encryptPassword: function(password){
        if (!password) return "";
        try{
            return crypto
                .createHmac("sha1", this.salt) // salt long complicated unique string
                .update(password)
                .digest("hex");
        }catch(err){
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);
