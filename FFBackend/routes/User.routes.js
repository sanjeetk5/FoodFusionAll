const express=require('express');
const {UserModel} = require('../model/User.model');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const Stripe = require('stripe');
const user=express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// login
user.post('/login',async(req,res)=>{
    try {
        const user=await UserModel.findOne({email:req.body.email});
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userName:user.userName},'innorik');
                res.status(200).send({"success":"User login successful","token":token});
            }else{
                res.status(401).send({"error":"wrong password"});
            }
        })
    } catch (error) {
        res.status(501).send({"failed":"user does not exist"});
    }
});

// register
user.post('/register',async(req,res)=>{
    try {
        const user=await UserModel.findOne({email:req.body.email});
        if(user){
            res.status(200).send({"error":"user is already registered"});
        }else{
            bcrypt.hash(req.body.password,5,async(err,hash)=>{
            if(hash){
                const user=new UserModel({name:req.body.name,email:req.body.email,password:hash});
                await user.save();
                res.status(201).send({"Success":"User create successful"});
            }else{
                res.status(501).send({"error":"failed to hash the password"});
            }
        })
    }
    } catch (error) {
        res.status(501).send({"error":"failed to create the user"});
    }
});


user.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;  // amount in paise

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,            // e.g. grandTotal * 100
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports={user};