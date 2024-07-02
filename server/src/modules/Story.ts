import {Schema, model} from "mongoose";

const StorySchema = new Schema({
  author: {},
  image: String,
  description: String,
  likes: [String],
  views: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  author_id: String
}, {timestamps: true});

export default model("Story", StorySchema)