"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    author: {
        id: String,
        username: String,
        profile_img: String
    },
    post_id: String,
    comment: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Comment", CommentSchema);
