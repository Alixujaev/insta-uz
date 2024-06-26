import {Schema, model} from "mongoose";

const FollowersSchema = new Schema({
  user_id: String,
  followers: [{
    id: String,
    username: String,
    profile_img: String,
    full_name: String
  }]
}, {timestamps: true});