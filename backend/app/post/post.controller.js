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

    const {token} = req.cookies;
    jwt.verify(token, Secret, {}, async (err,info) => {
        if (err) throw err;
        const {title,summary,content,price} = req.body;
        const postDoc = await Post.create({
        title,
        summary,
        content,
        price,
        cover:newPath,
        author:info.id,
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

export async function GetPosts(req, res){
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({createdAt: -1})
            .limit(20)
    );
}

export async function GetPost(req, res){
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    console.log(postDoc);
    res.json(postDoc);
}
