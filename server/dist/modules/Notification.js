"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post"
    },
    comment: String,
    type: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Notification", NotificationSchema);
