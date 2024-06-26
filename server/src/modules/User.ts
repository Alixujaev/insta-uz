import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  full_name: String,
  username: String,
  password: String,
  email: String,
  about: String,
  followers: [{
    id: String,
    username: String,
    profile_img: String,
    full_name: String
  }],
  following: [{
    id: String,
    username: String,
    profile_img: String,
    full_name: String
  }],
  posts: [String],
  stories: [String],
  profile_img: String
}, {timestamps: true});

export default model("User", UserSchema)