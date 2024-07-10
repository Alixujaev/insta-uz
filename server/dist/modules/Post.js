"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    author: {},
    image: String,
    description: String,
    likes: [String],
    comments: [String],
    author_id: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Post", PostSchema);
