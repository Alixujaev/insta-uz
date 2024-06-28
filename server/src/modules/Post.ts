import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  author: String,
  image: String,
  description: String,
  likes: [String],
  comments: [String],
}, {timestamps: true});

export default model("Post", PostSchema)