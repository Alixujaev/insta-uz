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
exports.verifyConfirmationCode = exports.sendConfirmationCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
let confirmationCodes = {};
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'islomali3110@gmail.com',
        pass: 'lddiefjldcpfguud'
    }
});
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}
function sendConfirmationCode(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = generateCode();
        confirmationCodes[email] = code;
        const mailOptions = {
            from: 'Instagram uz',
            to: email,
            subject: 'Ваш код подтверждения',
            text: `Ваш код подтверждения ${code}`
        };
        yield transporter.sendMail(mailOptions);
        console.log(`Ваш код подтверждения ${email}: ${code}`);
    });
}
exports.sendConfirmationCode = sendConfirmationCode;
function verifyConfirmationCode(email, code) {
    if (confirmationCodes[email] === code) {
        delete confirmationCodes[email];
        return true;
    }
    else {
        return false;
    }
}
exports.verifyConfirmationCode = verifyConfirmationCode;
