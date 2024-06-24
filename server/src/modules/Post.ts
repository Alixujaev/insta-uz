import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  author_id: String,
  image: String,
  title: String,
  description: String,
  likes: [String],
  comments: [{author_id: String, comment: String}],
}, {timestamps: true});

export default model("Post", PostSchema)