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
  isSoldOut: String,
  isReported: String,
  cover:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

const Post = model('Post', PostSchema);

export default Post;
//module.exports = Post;