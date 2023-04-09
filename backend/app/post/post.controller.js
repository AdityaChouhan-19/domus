/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import Post from './post.model.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import {Secret} from '../utils/config.js';

export async function CreatePost(req, res){

    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    let token = req.cookies.x_auth;

    jwt.verify(token, Secret, async (err,info) => {
        if (err) throw err;
        const {title,summary,content,price,nearBy,distance,authorEmail} = req.body;

        const postDoc = await Post.create({
        title,
        summary,
        content,
        price,
        nearBy,
        distance,
        cover: '/' + newPath,
        author:info,
        authorEmail: authorEmail,
        });
        res.json(postDoc);
    });
}

export async function UpdatePost(req, res){
    let newPath = null;
    let body = null;
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
        body = req.body;
        body.cover = '/' + newPath;
    }else{
        body = req.body;
    }

    delete body.file;
    console.log(body);

    Post.updateOne({ _id: req.params.id }, body)
    .then((err, result) => {
        return res.status(200).send({
            result
        })
    })
    .catch(err => {
        console.error(err);
    });

    
}

export async function UpdatePostKeepPhoto(req, res){

    let dateString = '';

    const post = await Post.findById(req.params.id);
    if(post.isSoldOut === 'N'){
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        const second = now.getSeconds().toString().padStart(2, '0');
    
        dateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }else{
        dateString = 'N';
    }
 

    Post.updateOne({ _id: req.params.id }, { isSoldOut: dateString})
    .then((err, result) => {
        return res.status(200).send({
            result
        })
    })
    .catch(err => {
        console.error(err);
    });

}

export async function GetPosts(req, res){


    if(req.query.distance == ''){
        req.query.distance = '0';
    }
    if(req.query.minPrice == ''){
        req.query.minPrice = '0';
    }
    if(req.query.maxPrice == ''){
        req.query.maxPrice = '10000';
    }


    const distance = Number(req.query.distance);
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const conditions = {};
    if (req.query.nearby) {
        conditions.nearBy = { $regex: req.query.nearby, $options: 'i' };
    }
    if (distance) {
        conditions.distance = { $lte: distance };
    }
    if (minPrice) {
        conditions.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (maxPrice) {
        conditions.price = { $gte: minPrice, $lte: maxPrice };
    }
    conditions.isBanned = { $eq: 'N' }
    
    const query = Post.find(conditions).lean();
    const result = await query.exec();

    return res.status(200).send(result);

}

export async function GetMyPosts(req, res){

    res.json(
        await Post.find({ author: req.user._id, isBanned: 'N' })
            .populate('author', ['username'])
            .sort({createdAt: -1})
            .limit(20)
    );
}

export async function GetPost(req, res){
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);

    res.json(postDoc);
}





export async function UpdatePostReportStatus(req, res){


    Post.updateOne({ _id: req.params.id }, { isReported: req.user._id})
    .then((err, result) => {
        return res.status(200).send({
            result
        })
    })
    .catch(err => {
        console.error(err);
    });

}


export async function UpdatePostComment(req, res){

    Post.updateOne({ _id: req.params.id }, { $push: {comments: req.body}})
    .then((err, result) => {
        return res.status(200).send({
            result
        })
    })
    .catch(err => {
        console.error(err);
    });

}
