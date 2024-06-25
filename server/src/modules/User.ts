import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  full_name: String,
  username: String,
  password: String,
  email: String,
  about: String,
  followers: [String],
  following: [String],
  posts: [String],
  stories: [String],
  profile_img: String
}, {timestamps: true});

export default model("User", UserSchema)