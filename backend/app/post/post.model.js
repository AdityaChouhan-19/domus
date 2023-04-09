/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const PostSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  nearBy: String,
  distance: Number,
  price:Number,
  photos: [String],
  likes: Number,
  isSoldOut: {
      type: String,
      default: 'N'
  },
  isReported: {
      type: String,
      default: 'N'
  },
  isBanned: {
      type: String,
      default: 'N'
  },
  comments: {
      type: [Object]
  },
  cover:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
  authorEmail: {type: String},
}, {
  timestamps: true,
});

const Post = model('Post', PostSchema);

export default Post;
