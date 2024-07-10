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
const User_1 = __importDefault(require("../modules/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../utils/token");
const confirmationService_1 = require("../services/confirmationService");
const router = (0, express_1.Router)();
const tempUserStorage = {};
router.post("/api/registration", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const existEmail = yield User_1.default.findOne({ email });
        if (existEmail) {
            return res.status(400).send({ success: false, message: 'Этот адрес электронной почты уже зарегистрирован', data: null });
        }
        const existUser = yield User_1.default.findOne({ username });
        if (existUser) {
            return res.status(400).send({ success: false, message: 'Это имя пользователя уже занято', data: null });
        }
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        // Store user data temporarily
        tempUserStorage[email] = Object.assign(Object.assign({}, req.body), { password: hashedPass });
        const code = yield (0, confirmationService_1.sendConfirmationCode)(email);
        res.status(200).send({
            success: true,
            message: 'Код подтверждения отправлен на ваш email'
        });
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при регистрации', error });
    }
}));
router.post('/api/verify-code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    if (!email || !code) {
        return res.status(400).send({ success: false, message: 'Email и код обязательны' });
    }
    try {
        const isValid = (0, confirmationService_1.verifyConfirmationCode)(email, code);
        if (isValid) {
            const existUser = yield User_1.default.findOne({ email });
            if (existUser) {
                const token = (0, token_1.generateNewToken)(existUser._id.toString());
                res.status(200).send({
                    success: true,
                    message: "Ваш адрес электронной почты успешно подтвержден",
                    data: {
                        user: existUser,
                        token
                    }
                });
            }
            const userData = tempUserStorage[email];
            if (!userData) {
                res.status(400).send({
                    success: false,
                    message: 'Пользовательские данные не найдены'
                });
            }
            const newUser = yield User_1.default.create(Object.assign(Object.assign({}, userData), { followers: [], following: [] }));
            const token = (0, token_1.generateNewToken)(newUser._id.toString());
            delete tempUserStorage[email];
            res.status(200).send({
                success: true,
                message: 'Код успешно подтвержден, пользователь создан',
                data: {
                    user: {
                        id: newUser._id,
                        full_name: newUser.full_name,
                        username: newUser.username,
                        email: newUser.email,
                        followers: newUser.followers,
                        following: newUser.following
                    },
                    token
                }
            });
        }
        else {
            res.status(400).send({ success: false, message: 'Неверный код' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Ошибка при проверке кода', error });
    }
}));
router.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User_1.default.findOne({ username });
    if (!user) {
        return res.status(400).send({ success: false, message: 'Пользователь не найден' });
    }
    if (!user.password) {
        return res.status(400).send({ success: false, message: 'Пароль не найден' });
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send({ success: false, message: 'Неверный пароль' });
    }
    const token = (0, token_1.generateNewToken)(user._id.toString());
    res.status(200).send({
        success: true,
        message: 'Аутентификация прошла успешно',
        data: {
            user: {
                id: user._id,
                full_name: user.full_name,
                username: user.username,
                email: user.email,
                followers: user.followers,
                following: user.following
            },
            token
        }
    });
}));
router.post("/api/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existUser = yield User_1.default.findOne({ email });
    if (!existUser) {
        return res.status(400).send({ success: false, message: 'Пользователь не найден' });
    }
    const code = yield (0, confirmationService_1.sendConfirmationCode)(email);
    res.status(200).send({
        success: true,
        message: 'Код подтверждения отправлен на ваш email'
    });
}));
exports.default = router;
