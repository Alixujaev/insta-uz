"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("../middlewares/utils");
const cloudinary_1 = require("cloudinary");
const dotenv = __importStar(require("dotenv"));
const storage_1 = __importDefault(require("../utils/storage"));
const Post_1 = __importDefault(require("../modules/Post"));
const User_1 = __importDefault(require("../modules/User"));
const Comment_1 = __importDefault(require("../modules/Comment"));
const Notification_1 = __importDefault(require("../modules/Notification"));
const router = (0, express_1.Router)();
dotenv.config();
//cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const upload = (0, multer_1.default)({ storage: storage_1.default });
router.post("/api/upload", upload.single("file"), utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    cloudinary_1.v2.uploader.upload(file.path, function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: error,
            });
        }
        res.send({
            success: true,
            message: "Файл успешно загружен",
            data: result
        });
    });
}));
router.post("/api/create-post", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, image } = req.body;
    if (!description || !image) {
        return res.status(400).send({ success: false, message: 'Заполните все поля' });
    }
    try {
        const author = yield User_1.default.findById(req.body.user.id);
        const newPost = yield Post_1.default.create({ author: author, author_id: req.body.user.id, description, image });
        yield User_1.default.updateOne({ _id: req.body.user.id }, { $push: { posts: newPost._id } });
        res.send({ success: true, message: 'Пост создан', data: newPost });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при создании поста', error });
    }
}));
router.get("/api/user-posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const posts = yield Post_1.default.find({ author_id: id });
        res.send({ success: true, message: 'Посты получены', data: posts });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
    }
}));
router.put("/api/like/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield Post_1.default.findById(req.params.id);
    if (post === null || post === void 0 ? void 0 : post.likes.includes(req.body.user.id)) {
        return res.status(400).send({ success: false, message: 'Вы уже поставили лайк' });
    }
    try {
        const post = yield Post_1.default.findByIdAndUpdate({ _id: id }, { $push: { likes: req.body.user.id } });
        const authorId = post === null || post === void 0 ? void 0 : post.author_id;
        if (authorId !== req.body.user.id) {
            yield Notification_1.default.create({
                sender: req.body.user.id,
                receiver: authorId,
                post: post,
                type: 'like'
            });
        }
        res.send({ success: true, message: 'Лайк поставлен' });
    }
    catch (error) {
        console.log(error);
    }
}));
router.put("/api/unlike/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield Post_1.default.findById(req.params.id);
    if (!(post === null || post === void 0 ? void 0 : post.likes.includes(req.body.user.id))) {
        return res.status(400).send({ success: false, message: 'Вы не поставили лайк' });
    }
    try {
        yield Post_1.default.findByIdAndUpdate({ _id: id }, { $pull: { likes: req.body.user.id } });
        res.send({ success: true, message: 'Лайк снят' });
    }
    catch (error) {
        console.log(error);
    }
}));
router.post("/api/comment", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, postId } = req.body;
    if (!comment) {
        return res.status(400).send({ success: false, message: 'Заполните все поля' });
    }
    try {
        const author = yield User_1.default.findById(req.body.user.id);
        const newComment = yield Comment_1.default.create({
            author: {
                id: author === null || author === void 0 ? void 0 : author._id,
                username: author === null || author === void 0 ? void 0 : author.username,
                profile_img: author === null || author === void 0 ? void 0 : author.profile_img
            },
            post_id: postId,
            comment
        });
        const post = yield Post_1.default.findByIdAndUpdate({ _id: postId }, { $push: { comments: req.body.user.id } });
        const authorId = post === null || post === void 0 ? void 0 : post.author_id;
        if (authorId !== req.body.user.id) {
            yield Notification_1.default.create({
                sender: req.body.user.id,
                receiver: authorId,
                post: post,
                comment,
                type: 'comment'
            });
        }
        res.send({ success: true, message: 'Комментарий добавлен', data: newComment });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при добавлении комментария', error });
    }
}));
router.get("/api/comments/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const comments = yield Comment_1.default.find({ post_id: id });
        res.send({ success: true, message: 'Комментарии получены', data: comments });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении комментариев', error });
    }
}));
router.delete("/api/delete-post/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield Post_1.default.findById(id);
    // if (post.author_id !== req.body.user.id) {
    //   return res.status(400).send({ success: false, message: 'Вы не можете удалить пост' });
    // }
    try {
        yield User_1.default.updateOne({ _id: req.body.user.id }, { $pull: { posts: id } });
        yield Post_1.default.findByIdAndDelete({ _id: id });
        res.send({ success: true, message: 'Пост удален' });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при удалении поста', error });
    }
}));
router.get("/api/post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const post = yield Post_1.default.findById(id);
        res.send({ success: true, message: 'Пост получен', data: post });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении поста', error });
    }
}));
router.put("/api/post/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield Post_1.default.findById(id);
    // if (post.author_id !== req.body.user.id) {
    //   return res.status(400).send({ success: false, message: 'Вы не можете редактировать пост' });
    // }
    try {
        yield Post_1.default.findByIdAndUpdate({ _id: id }, { description: req.body.description });
        res.send({ success: true, message: 'Пост отредактирован' });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при редактировании поста', error });
    }
}));
router.put("/api/save/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const myId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield User_1.default.findById(myId);
        let updatedUser;
        if (user === null || user === void 0 ? void 0 : user.saved.includes(id)) {
            updatedUser = yield User_1.default.findByIdAndUpdate(myId, { $pull: { saved: id } }, { new: true });
        }
        else {
            updatedUser = yield User_1.default.findByIdAndUpdate(myId, { $push: { saved: id } }, { new: true });
        }
        res.status(200).send({ success: true, message: 'Пост сохранен', data: updatedUser });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при сохранении поста', error });
    }
}));
router.get("/api/saved", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saved = yield User_1.default.findById(req.body.user.id).select('saved').populate('saved', '_id image description author likes comments author_id createdAt');
        res.send({ success: true, message: 'Посты получены', data: saved });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
    }
}));
router.get("/api/following-posts", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myId = req.body.user.id;
    try {
        const user = yield User_1.default.findById(myId);
        const myPost = yield Post_1.default.find({ author_id: myId });
        const subbed = yield Post_1.default.find({ author_id: { $in: user === null || user === void 0 ? void 0 : user.following } });
        res.send({ success: true, message: 'Посты получены', data: [...subbed, ...myPost] });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
    }
}));
exports.default = router;
