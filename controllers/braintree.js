const User = require("../models/user");
const braintree = require("braintree");
require("dotenv").config();

const gateway = braintree.connect({
    environment:braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

// Brain Tree connecting method to generate token
exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response){
        if(err){
            res.status(500).send(err);
        }else{
            res.send(response);
        }
    });
};

// Process Payment Method
exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromClient = req.body.amount
    //charge
    let newTransaction = getway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
        options:{
            submitForSettlement: true
        }
    }, (error, result) => {
        if (error){
            res.status(500).json(erro)
        } else {
            res.json(result)
        }
    });
};