import { Router } from "express";
import { CreatePost, GetPost, GetPosts, UpdatePost } from "./post.controller.js";
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });

const router = Router();

router.post('/post', uploadMiddleware.single('file'), CreatePost);

router.put('/post', uploadMiddleware.single('file'), UpdatePost);

router.get('/post', GetPosts);

router.get('/post/:id', GetPost);

export default router;