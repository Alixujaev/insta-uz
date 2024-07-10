"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret is not defined." });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.user = decode;
        next();
    }
    catch (error) {
        res.status(400).send({ success: false, message: 'Некорректный токен.' });
    }
};
exports.verifyToken = verifyToken;
