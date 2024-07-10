"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    conversationId: String,
    message: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Message", MessageSchema);
