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
const utils_1 = require("../middlewares/utils");
const User_1 = __importDefault(require("../modules/User"));
const Story_1 = __importDefault(require("../modules/Story"));
const node_cron_1 = __importDefault(require("node-cron"));
const router = (0, express_1.Router)();
router.post("/api/create-story", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, image } = req.body;
    if (!image) {
        return res.status(400).send({ success: false, message: 'Заполните все поля' });
    }
    try {
        const author = yield User_1.default.findById(req.body.user.id);
        const newPost = yield Story_1.default.create({ author: author, author_id: req.body.user.id, description, image });
        yield User_1.default.updateOne({ _id: req.body.user.id }, { $push: { stories: newPost._id } });
        res.send({ success: true, message: 'Сторис создан', data: newPost });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при создании поста', error });
    }
}));
router.get("/api/story/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        let story = yield Story_1.default.findById(id);
        res.send({ success: true, message: 'Пост получен', data: story });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении поста', error });
    }
}));
router.put("/api/view/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        let story = yield Story_1.default.findById(id);
        console.log(!(story === null || story === void 0 ? void 0 : story.views.includes(req.body.user.id)));
        if (story === null || story === void 0 ? void 0 : story.views.includes(req.body.user.id))
            return;
        story = yield Story_1.default.findByIdAndUpdate(id, { $push: { views: req.body.user.id } });
        res.send({ success: true, message: 'Пост получен', data: story });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении поста', error });
    }
}));
router.delete("/api/delete-story/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield User_1.default.updateOne({ _id: req.body.user.id }, { $pull: { stories: id } });
        yield Story_1.default.findByIdAndDelete({ _id: id });
        res.send({ success: true, message: 'Пост удален' });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при удалении поста', error });
    }
}));
router.get("/api/viewers/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const story = yield Story_1.default.findById(id);
    if ((story === null || story === void 0 ? void 0 : story.author_id) !== req.body.user.id) {
        return res.status(400).send({ success: false, message: 'Вы не можете просмотреть подписчиков' });
    }
    try {
        const viewers = yield Story_1.default.findById(id).select('views').populate('views', 'profile_img username full_name');
        res.status(200).send({ success: true, data: viewers });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении подписчиков', error });
    }
}));
router.get("/api/stories", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myId = req.body.user.id;
    try {
        const user = yield User_1.default.findById(myId);
        const myStory = yield Story_1.default.find({ author_id: myId });
        const stories = yield Story_1.default.find({ author_id: { $in: user === null || user === void 0 ? void 0 : user.following } });
        res.send({ success: true, message: 'Посты получены', data: [...stories, ...myStory] });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
    }
}));
node_cron_1.default.schedule('0 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const twentyFourHoursAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    try {
        const oldStories = yield Story_1.default.find({ createdAt: { $lte: twentyFourHoursAgo } });
        for (const story of oldStories) {
            yield User_1.default.updateOne({ _id: story.author_id }, { $pull: { stories: story._id } });
            yield Story_1.default.findByIdAndDelete(story._id);
        }
        console.log('Old stories deleted');
    }
    catch (error) {
        console.error('Error deleting old stories:', error);
    }
}));
exports.default = router;
