/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


import { MongoURI } from './app/utils/config.js';

// ES Modules fix for __dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


import userRouter from './app/user/user.route.js';
import postRouter from './app/post/post.route.js';
import adminRouter from './app/admin/admin.route.js';

const Port = 4000;
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

//application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.set('strictQuery', false);
mongoose.connect(MongoURI);
const db = mongoose.connection;
db.on('open', () => console.log(`Connected to MongoDB`));
db.on('error', () => console.error('Connection Error'));




app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', adminRouter);


app.listen(Port, () => {
  console.log(`Localhost:4000 app listening on port ${Port}`);
})
