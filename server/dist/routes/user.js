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
const mongodb_1 = require("mongodb");
const Notification_1 = __importDefault(require("../modules/Notification"));
const router = (0, express_1.Router)();
router.get("/api/about-me", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.body.user.id);
        res.status(200).send({ success: true, data: {
                id: user === null || user === void 0 ? void 0 : user._id,
                email: user === null || user === void 0 ? void 0 : user.email,
                username: user === null || user === void 0 ? void 0 : user.username,
                full_name: user === null || user === void 0 ? void 0 : user.full_name,
                followers: user === null || user === void 0 ? void 0 : user.followers,
                following: user === null || user === void 0 ? void 0 : user.following,
                about: user === null || user === void 0 ? void 0 : user.about,
                posts: user === null || user === void 0 ? void 0 : user.posts,
                stories: user === null || user === void 0 ? void 0 : user.stories,
                profile_img: user === null || user === void 0 ? void 0 : user.profile_img,
                saved: user === null || user === void 0 ? void 0 : user.saved
            } });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/api/recomendeds", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const myId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!myId) {
        return res.status(400).send({ success: false, message: 'Пользователь не найден' });
    }
    const myObjectId = mongodb_1.ObjectId.createFromHexString(myId);
    try {
        const users = yield User_1.default.find();
        const filteredUsers = users.filter((user) => user._id.toHexString() !== myId && !user.followers.includes(myId));
        res.status(200).send({ success: true, data: filteredUsers });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении подписок', error });
    }
}));
router.get("/api/profile/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username: req.params.username });
        if (user) {
            res.status(200).send({ success: true, data: {
                    user: {
                        id: user === null || user === void 0 ? void 0 : user._id,
                        email: user === null || user === void 0 ? void 0 : user.email,
                        username: user === null || user === void 0 ? void 0 : user.username,
                        full_name: user === null || user === void 0 ? void 0 : user.full_name,
                        followers: user === null || user === void 0 ? void 0 : user.followers,
                        following: user === null || user === void 0 ? void 0 : user.following,
                        profile_img: user === null || user === void 0 ? void 0 : user.profile_img,
                        about: user === null || user === void 0 ? void 0 : user.about,
                        posts: user === null || user === void 0 ? void 0 : user.posts,
                        createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
                        stories: user === null || user === void 0 ? void 0 : user.stories
                    }
                } });
        }
        else {
            res.status(404).send({ success: false, message: 'Пользователь не найден' });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Пользователь не найден', error });
    }
}));
router.get("/api/id/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        res.status(200).send({ success: true, data: {
                user: {
                    id: user === null || user === void 0 ? void 0 : user._id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    username: user === null || user === void 0 ? void 0 : user.username,
                    full_name: user === null || user === void 0 ? void 0 : user.full_name,
                    followers: user === null || user === void 0 ? void 0 : user.followers,
                    following: user === null || user === void 0 ? void 0 : user.following,
                    profile_img: user === null || user === void 0 ? void 0 : user.profile_img,
                    about: user === null || user === void 0 ? void 0 : user.about,
                    posts: user === null || user === void 0 ? void 0 : user.posts,
                    createdAt: user === null || user === void 0 ? void 0 : user.createdAt
                }
            } });
    }
    catch (error) {
        console.log(error);
    }
}));
router.put("/api/update-user", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.body.user.id, Object.assign(Object.assign({}, req.body), { full_name: req.body.fullName }));
        res.status(200).send({ success: true, data: {
                id: user === null || user === void 0 ? void 0 : user._id,
                email: user === null || user === void 0 ? void 0 : user.email,
                username: user === null || user === void 0 ? void 0 : user.username,
                full_name: user === null || user === void 0 ? void 0 : user.full_name,
                followers: user === null || user === void 0 ? void 0 : user.followers,
                following: user === null || user === void 0 ? void 0 : user.following,
                about: user === null || user === void 0 ? void 0 : user.about,
                posts: user === null || user === void 0 ? void 0 : user.posts,
                stories: user === null || user === void 0 ? void 0 : user.stories
            } });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/api/exist/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username: req.params.username });
        if (user) {
            return res.status(400).send({ success: false, message: 'Такое имя пользователя уже занято' });
        }
        else {
            return res.status(200).send({ success: true, message: 'Имя пользователя свободно' });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/api/search/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const users = yield User_1.default.find({ username: { $regex: username, $options: 'i' } });
        res.status(200).send({ success: true, data: users });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при поиске', error });
    }
}));
router.put('/api/follow/:id', utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userIdToFollow = req.params.id;
    const userId = (_b = req.body.user) === null || _b === void 0 ? void 0 : _b.id;
    if (!userId) {
        return res.status(400).send({ success: false, message: 'User not found' });
    }
    try {
        const userBeingFollowed = yield User_1.default.findByIdAndUpdate(userIdToFollow, { $push: { followers: userId } }, { new: true });
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { $push: { following: userIdToFollow } }, { new: true });
        yield Notification_1.default.create({
            sender: userId,
            receiver: userIdToFollow,
            type: 'follow'
        });
        res.status(200).send({
            success: true,
            message: 'You have followed the user',
            data: { userBeingFollowed, updatedUser },
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while following',
            error: error.message,
        });
    }
}));
router.put("/api/unfollow/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userIdToUnfollow = req.params.id;
    const userId = (_c = req.body.user) === null || _c === void 0 ? void 0 : _c.id;
    if (!userId) {
        return res.status(400).send({ success: false, message: 'Пользователь не найден' });
    }
    try {
        const userBeingUnfollowed = yield User_1.default.findByIdAndUpdate(userIdToUnfollow, { $pull: { followers: userId } }, { new: true });
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { $pull: { following: userIdToUnfollow } }, { new: true });
        res.status(200).send({
            success: true,
            message: 'Вы отписались от пользователя',
            data: { userBeingUnfollowed, updatedUser }
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Ошибка при отписке',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
}));
router.get("/api/followers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const users = yield User_1.default.findById(id).select('followers').populate('followers', 'profile_img username full_name');
        res.status(200).send({ success: true, data: users });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении подписчиков', error });
    }
}));
router.get("/api/following/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield User_1.default.findById(id).select('following').populate('following', 'profile_img username full_name');
        res.status(200).send({ success: true, data: user });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении подписок', error });
    }
}));
router.put("/api/follower/:id", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = req.params.id;
    const myId = (_d = req.body.user) === null || _d === void 0 ? void 0 : _d.id;
    if (!myId) {
        return res.status(400).send({ success: false, message: 'Пользователь не найден' });
    }
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(myId, { $pull: { followers: id } }, { new: true });
        res.status(200).send({ success: true, message: 'Подписчик удален', data: updatedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Ошибка при удалении подписчика', error });
    }
}));
exports.default = router;
