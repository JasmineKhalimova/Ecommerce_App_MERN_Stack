const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: ObjectId, //used to connect with category
        ref: "Category", // relationship created with category model
        required: true // need to refer to certain category
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        required: false
    },
},

{ timestamps: true }

);

module.exports = mongoose.model("Product", productSchema);
