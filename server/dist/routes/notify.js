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
const Notification_1 = __importDefault(require("../modules/Notification"));
const router = (0, express_1.Router)();
router.get("/api/notifications", utils_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myId = req.body.user.id;
    try {
        const notifications = yield Notification_1.default.find({ receiver: myId }).populate('sender', 'profile_img username full_name').populate('post', 'image _id');
        res.send({ success: true, data: notifications.reverse() });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при получении уведомлений', error });
    }
}));
exports.default = router;
