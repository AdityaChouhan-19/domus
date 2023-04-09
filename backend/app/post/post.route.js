/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import { Router } from "express";
import { CreatePost, GetMyPosts, GetPost, GetPosts, UpdatePost, UpdatePostComment, UpdatePostKeepPhoto, UpdatePostReportStatus } from "./post.controller.js";
import auth from "../middleware/auth.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });


const router = Router();

router.post('/api/post', upload.single('file'), CreatePost);

router.put('/api/post', upload.single('file'), UpdatePost);

router.put('/api/post/keepphoto/:id', UpdatePostKeepPhoto);

router.get('/api/post', GetPosts);

router.get('/api/post/myposting', auth, GetMyPosts);

router.get('/api/post/:id', GetPost);

router.put('/api/post/report/:id',auth, UpdatePostReportStatus);

router.put('/api/post/comment/:id', auth, UpdatePostComment);

export default router;