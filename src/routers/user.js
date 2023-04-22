const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

const User = require("../models/user");
const { default: mongoose } = require("mongoose");

router.put("/user",async(req,res)=>{
    bcrypt.hash(req.body.password,10,async (err, hash)=>{
            if (err) {
                res.status(400).send(err);
            }else{
                const user = new User({
                    _id: new mongoose.Types.ObjectId,
                    first_name:req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hash
                })
            try{ 
                const createUser = await user.save();
                res.status(201).send(createUser.id);
            }catch(e){
                res.status(400).send(e);
            }
            }
        })
});

router.post("/user",async(req,res)=>{
    try{
        const email = req.body.email;
        const user = await User.find({email:email});
        if (user.length<1) {
            res.status(404).send(`Invalid Details`);
        }else{
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if (err) {
                    res.status(400).send(err);
                }
                if (result) {
                    const token = jwt.sign({
                        id: user[0].id
                    },process.env.jwt_secret,{
                        expiresIn: "24h"
                    });
                    res.status(200).send({
                        token:token,
                        id: user[0].id
                    });

                }else{
                    res.status(404).send(`Invalid Details`);
                }
            });
        }
    }catch(e){
        res.status(404).send(e);
    }
});

router.get("/user/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).send(`No User Found with id ${_id}.`);
        }else{
            var publicData = user;
            publicData.email = undefined;
            publicData.password = undefined;

            res.status(200).send(publicData);
        }
    }catch(e){
        res.status(404).send(e);
    }
});

router.patch("/user/:id", auth,async(req,res)=>{
    try{
        const _id = req.params.id;
        const userUpdate = await User.findByIdAndUpdate(_id, req.body, {new:true});
        if (!userUpdate) {
            res.status(404).send(`No User Found with id ${_id}.`);
        }else{
            
            var publicData = userUpdate;
            publicData.email = undefined;
            publicData.password = undefined;

            res.status(200).send(publicData);
        }
    }catch(e){
        res.status(404).send(e);
    }
});

router.delete("/user/:id", auth,async(req,res)=>{
    try{
        const _id = req.params.id;
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            res.status(404).send(`No User Found with id ${_id}.`);
        }else{
            res.status(200).send(user.id);
        }
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;