const formidable = require("formidable"); // uploading images and files
const _ = require("lodash");
const fs = require("fs");// getting access to file system
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

//creating product by id method
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

// product read request method
exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

// image and file upload method
exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json ({
                error: "Image could not be uploaded"
            });
        }
        //setting validation for all the fields 
        const { name, description, price, category, quantity, shipping } = fields

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All fields are required"
            }); 
        }

        let product = new Product (fields);

        if(files.photo){
            // image validation 2mb = 2000000
            if(files.photo.size > 2000000){
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, result) =>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

// Delete method
exports.remove = (req, res) => {

    let product = req.product

    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Product deleted successfully"
        });
    });
};