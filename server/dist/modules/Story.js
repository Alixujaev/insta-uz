"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StorySchema = new mongoose_1.Schema({
    author: {},
    image: String,
    description: String,
    likes: [String],
    views: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    author_id: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Story", StorySchema);
