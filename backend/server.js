
import express from 'express';

import cors from 'cors';

import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';
const app = express();

import jwt from 'jsonwebtoken';

import cookieParser from 'cookie-parser';

import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });

import fs from 'fs';
import { MongoURI } from './app/utils/config.js';

// ES Modules fix for __dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


import authRouter from './app/auth/auth.route.js';
import userRouter from './app/user/user.route.js';
import postRouter from './app/post/post.route.js';


const Port = 4000;



app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.set('strictQuery', false);
mongoose.connect(MongoURI);
const db = mongoose.connection;
db.on('open', () => console.log(`Connected to MongoDB`));
db.on('error', () => console.error('Connection Error'));





app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', postRouter);



app.listen(Port, () => {
  console.log(`Localhost:4000 app listening on port ${Port}`);
})
//