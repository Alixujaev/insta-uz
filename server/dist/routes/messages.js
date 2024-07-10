"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Messages_1 = __importDefault(require("../modules/Messages"));
const Conversation_1 = __importDefault(require("../modules/Conversation"));
const utils_1 = require("../middlewares/utils");
const router = (0, express_1.Router)();
router.post("/api/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = new Messages_1.default(req.body);
    try {
        const savedMessages = yield newMessage.save();
        res.status(200).send({ success: true, data: savedMessages });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при создании диалога', error });
    }
}));
router.get("/api/messages/:conversationId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield Conversation_1.default.find({
            _id: req.params.conversationId
        }).select('members').select("updatedAt").populate('members', 'profile_img username full_name');
        const messages = yield Messages_1.default.find({
            conversationId: req.params.conversationId
        });
        if (conversation.length > 0) {
            res.send({ success: true, data: { messages, conversation } });
        }
        else {
            res.status(404).send({ success: false, message: 'Диалог не найден' });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
    }
}));
router.get("/api/messages-user/:userId", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield Conversation_1.default.find({
            members: { $all: [req.body.user.id, req.params.userId] }
        }).select('members').select("updatedAt").populate('members', 'profile_img username full_name');
        const messages = yield Messages_1.default.find({
            conversationId: conversation[0]._id
        });
        if (conversation.length > 0) {
            res.send({ success: true, data: { messages, conversation } });
        }
        else {
            res.status(404).send({ success: false, message: 'Диалог не найден' });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
    }
}));
exports.default = router;
