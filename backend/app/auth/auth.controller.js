import User from '../user/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Secret } from '../utils/config.js'


export async function Register(req, res){
    const salt = bcrypt.genSaltSync(10);

    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
  }
}

export async function Login(req, res){
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // logged in
        jwt.sign({username,id:userDoc._id}, Secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
            id:userDoc._id,
            username,
        });
        });
    } else {
        res.status(400).json('wrong credentials');
    }
}

export async function Profile(req, res){
    const {token} = req.cookies;
    jwt.verify(token, Secret, {}, (err,info) => {
        if (err) throw err;
        res.json(info);
    });
}

export function Logout(req, res){
    res.cookie('token', '').json('ok');
}