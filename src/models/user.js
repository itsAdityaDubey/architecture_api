const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type:String,
        required:true
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;