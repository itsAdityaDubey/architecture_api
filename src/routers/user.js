const express = require("express");
const router = new express.Router();

const User = require("../models/user");

router.get("/user",async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).send(users);
    }catch(e){
        res.status(404).send(e);
    }
});

router.post("/user",async(req,res)=>{
    try{
        const user = new User(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser.id);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get("/user/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).send(`No User Found with id ${_id}.`);
        }else{
            res.status(200).send(user);
        }
    }catch(e){
        res.status(404).send(e);
    }
});

router.patch("/user/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const userUpdate = await User.findByIdAndUpdate(_id, req.body, {new:true});
        if (!userUpdate) {
            res.status(404).send(`No User Found with id ${_id}.`);
        }else{
            res.status(200).send(userUpdate);
        }
    }catch(e){
        res.status(404).send(e);
    }
});

router.delete("/user/:id",async(req,res)=>{
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