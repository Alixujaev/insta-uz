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
const Conversation_1 = __importDefault(require("../modules/Conversation"));
const utils_1 = require("../middlewares/utils");
const router = (0, express_1.Router)();
router.post("/api/conversations", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existConversation = yield Conversation_1.default.findOne({
        members: { $all: [req.body.user.id, req.body.receiverId] }
    });
    const newConversation = new Conversation_1.default({
        members: [req.body.user.id, req.body.receiverId]
    });
    try {
        if (existConversation) {
            return res.status(200).send({ success: true, data: existConversation });
        }
        const savedConversation = yield newConversation.save();
        res.status(200).send({ success: true, data: savedConversation });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при создании диалога', error });
    }
}));
router.get("/api/conversations/:userId", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversations = yield Conversation_1.default.find({
            members: { $in: [req.params.userId] }
        }).select('members').select("updatedAt").populate('members', 'profile_img username full_name');
        res.send({ success: true, data: conversations });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
    }
}));
router.get("/api/conversation/:userId", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield Conversation_1.default.find({
            members: { $all: [req.body.user.id, req.params.userId] }
        });
        if (conversation) {
            res.send({ success: true, data: conversation });
        }
        else {
            res.status(404).send({ success: false, message: 'Диалог не найден' });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
    }
}));
router.delete("/api/conversations/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield Conversation_1.default.findByIdAndDelete({ _id: id });
        res.send({ success: true, message: 'Диалог удален' });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при удалении диалога', error });
    }
}));
exports.default = router;
