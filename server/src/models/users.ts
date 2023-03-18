import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }},
  {
    collection: 'users'
  });

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;