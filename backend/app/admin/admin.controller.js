/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/14/2023
algorithm explanation added.
*/

import User from "../user/user.model.js";
import Post from '../post/post.model.js';

export async function getUsers(req, res){
    //check if this user is admin
    if(req.user.role == 0){
        return res.send({success: false, message: 'You are not admin user'});
    }

    let searchInfo = {};
    //check if any search condition in req object.
    if(req.query.searchEmail !== ''){
        searchInfo.email = { $regex: req.query.searchEmail, $options: "i" };
    }

    User.find(searchInfo, { password: 0, savedList: 0 }, (err, users) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(users);
    });
    
}

export async function getReportedPostings(req, res){
    //check if this user is admin
    if(req.user.role == 0){
        return res.send({success: false, message: 'You are not admin user'});
    }

    Post.find({ isReported: { $not: { $eq: 'N' } } }, (err, postings) => {
        if (err) return res.json({ success: false, err });
        console.log(postings);
        return res.status(200).send(postings);
    });
    
}

export async function getBannedPostings(req, res){
    //check if this user is admin
    if(req.user.role == 0){
        return res.send({success: false, message: 'You are not admin user'});
    }

    Post.find({ isBanned: { $not: { $eq: 'N' } } }, (err, postings) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(postings);
    });
    
}

export async function updateReleasePosting(req, res){
    //check if this user is admin
    if(req.user.role == 0){
        return res.send({success: false, message: 'You are not admin user'});
    }


    Post.updateOne({_id: req.params.id},{ $set: { isReported: 'N', isBanned: 'N' } }, (err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(result);
    });
    
}

export async function updateBanPosting(req, res){
    //check if this user is admin
    if(req.user.role == 0){
        return res.send({success: false, message: 'You are not admin user'});
    }

    let dateString = '';

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    dateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    Post.updateOne({_id: req.params.id},{ $set: { isReported: 'N', isBanned: dateString } }, (err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(result);
    });
    
}

export async function updateBanUser(req, res){
    //check if this user is admin
    if(req.user.role == 0){
        return res.send({success: false, message: 'You are not admin user'});
    }

    let dateString = '';
    if(req.body.isBanned === 'N'){

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

    User.updateOne({_id: req.params.id},{ $set: { isBanned: dateString } }, (err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(result);
    });

}
