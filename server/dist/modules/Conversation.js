"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ConversationSchema = new mongoose_1.Schema({
    members: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Conversation", exports.ConversationSchema);
