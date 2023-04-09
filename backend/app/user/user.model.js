/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
import {Secret} from '../utils/config.js';


const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    isBanned: {
        type: String,
        default: 'N'
    },
    savedList: [String],
    token: {
        type: String,
        default: ''
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        //encrypt password
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function (plainPassword, cb) {

    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;

    // generate token using jsonwebtoken 
    var token = jwt.sign(user._id.toHexString(), Secret)
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id + ''  = token
    //decode token. 
    jwt.verify(token, Secret, function (err, decoded) {
        //find user by userid
        //check if db token and client token is matched
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}



const User = mongoose.model('User', userSchema)

export default User