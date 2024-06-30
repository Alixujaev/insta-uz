import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  author: {},
  image: String,
  description: String,
  likes: [String],
  comments: [String],
  author_id: String
}, {timestamps: true});

export default model("Post", PostSchema)