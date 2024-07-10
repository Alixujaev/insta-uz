"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateNewToken(id) {
    const jwtSecret = process.env.JWT_SECRET || "default_secret";
    return jsonwebtoken_1.default.sign({ id }, jwtSecret, { expiresIn: "30d" });
}
exports.generateNewToken = generateNewToken;
