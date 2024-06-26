import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  author: {
    id: String,
    username: String,
    profile_img: String
  },
  post_id: String,
  comment: String
}, {timestamps: true});

export default model("Comment", CommentSchema)