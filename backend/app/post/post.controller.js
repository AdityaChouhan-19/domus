import Post from './post.model.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import {Secret} from '../utils/config.js';

export async function CreatePost(req, res){
    //console.log(req.file);
    console.log('create post called!')
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    let token = req.cookies.x_auth;
    //console.log(token);
    jwt.verify(token, Secret, async (err,info) => {
        if (err) throw err;
        const {title,summary,content,price,nearBy,distance,authorEmail} = req.body;
        //console.log('here');
        console.log(info);
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
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, Secret, {}, async (err,info) => {
        if (err) throw err;
        const {id,title,summary,content,price} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
        return res.status(400).json('you are not the author');
        }
        await postDoc.update({
        title,
        summary,
        content,
        price,
        cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
    });
}

export async function UpdatePostKeepPhoto(req, res){
    console.log(req.params.id);
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
        console.log(res);
        return res.status(200).send({
            result
        })
    })
    .catch(err => {
        console.error(err);
    });

}

export async function GetPosts(req, res){
    console.log('getPosts called@@@@@@@@')
    

    if(req.query.distance == ''){
        req.query.distance = '0';
    }
    if(req.query.minPrice == ''){
        req.query.minPrice = '0';
    }
    if(req.query.maxPrice == ''){
        req.query.maxPrice = '10000';
    }

    console.log(req.query);

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

    //console.log(result);
    return res.status(200).send(result);
    // res.json(
    //     await Post.find()
    //         .populate('author', ['username'])
    //         .sort({createdAt: -1})
    //         .limit(20)
    // );
}

export async function GetMyPosts(req, res){
    //const {userId} = req.user;
    console.log('myposting called')
    console.log(req.user);
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
    console.log('getPost Called');
    console.log(postDoc);
    res.json(postDoc);
}





export async function UpdatePostReportStatus(req, res){
    console.log(req.params.id);
    console.log(req.user._id);

    Post.updateOne({ _id: req.params.id }, { isReported: req.user._id})
    .then((err, result) => {
        console.log(res);
        return res.status(200).send({
            result
        })
    })
    .catch(err => {
        console.error(err);
    });

}


export async function UpdatePostComment(req, res){
    console.log(req.params.id);
    console.log(req.user._id);

    console.log('comment called');
    console.log(req.body);

    Post.updateOne({ _id: req.params.id }, { $push: {comments: req.body}})
    .then((err, result) => {
        //console.log(res);
        return res.status(200).send({
            result
        })
    })
    .catch(err => {
        console.error(err);
    });

}
