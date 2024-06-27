import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  full_name: String,
  username: String,
  password: String,
  email: String,
  about: String,
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  posts: [String],
  stories: [String],
  profile_img: String
}, {timestamps: true});

export default model("User", UserSchema)