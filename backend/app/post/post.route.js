import { Router } from "express";
import { CreatePost, GetMyPosts, GetPost, GetPosts, UpdatePost } from "./post.controller.js";
import multer from 'multer';
import auth from "../middleware/auth.js";
const uploadMiddleware = multer({ dest: 'uploads/' });

const router = Router();

router.post('/api/post', uploadMiddleware.single('file'), CreatePost);

router.put('/api/post', uploadMiddleware.single('file'), UpdatePost);

router.get('/api/post', GetPosts);

router.get('/api/post/myposting', auth, GetMyPosts);

router.get('/api/post/:id', GetPost);

export default router;