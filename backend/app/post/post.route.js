import { Router } from "express";
import { CreatePost, GetMyPosts, GetPost, GetPosts, UpdatePost } from "./post.controller.js";
import auth from "../middleware/auth.js";
import multer from 'multer';
//const upload = multer({ dest: 'uploads/' });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });



const router = Router();

router.post('/api/post', upload.single('file'), async (req, res) => {
    console.log('create posting called')
    console.log(req.file);
    console.log('create posting called')
    // const {originalname,path} = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path+'.'+ext;
    // fs.renameSync(path, newPath);

    // const {token} = req.cookies;
    // jwt.verify(token, Secret, {}, async (err,info) => {
    //     if (err) throw err;
    //     const {title,summary,content,price,nearBy,distance} = req.body;
    //     const postDoc = await Post.create({
    //     title,
    //     summary,
    //     content,
    //     price,
    //     nearBy,
    //     distance,
    //     cover:newPath,
    //     author:info.id,
    //     });
    //     res.json(postDoc);
    // });
});

router.put('/api/post', upload.single('file'), UpdatePost);

router.get('/api/post', GetPosts);

router.get('/api/post/myposting', auth, GetMyPosts);

router.get('/api/post/:id', GetPost);

export default router;