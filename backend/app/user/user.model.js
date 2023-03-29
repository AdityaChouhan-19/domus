import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  username: {type: String, required: true, min: 4, unique: true},
  password: {type: String, required: true},
  name: String,
  phone: String,
  address: String,
  institution: String,
  savedList: [String],
  postingList: [String],
  userType: String,
});

const User = model('User', UserSchema);

export default User;