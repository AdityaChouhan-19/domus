import { Router } from "express";
import { CreatePost, GetMyPosts, GetPost, GetPosts, UpdatePost, UpdatePostComment, UpdatePostKeepPhoto, UpdatePostReportStatus } from "./post.controller.js";
import auth from "../middleware/auth.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });



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