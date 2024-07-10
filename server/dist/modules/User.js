"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    full_name: String,
    username: String,
    password: String,
    email: String,
    about: String,
    followers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    following: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    posts: [String],
    stories: [String],
    profile_img: String,
    saved: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post"
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
