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
exports.getUser = exports.users = exports.io = exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const story_1 = __importDefault(require("./routes/story"));
const notify_1 = __importDefault(require("./routes/notify"));
const conversation_1 = __importDefault(require("./routes/conversation"));
const messages_1 = __importDefault(require("./routes/messages"));
const http_1 = require("http"); // Import the http module
const socket_io_1 = require("socket.io"); // Import socket.io
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const corsOptions = {
    origin: 'https://instagram-neon-six.vercel.app', // Allow only this origin
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(auth_1.default);
app.use(user_1.default);
app.use(post_1.default);
app.use(story_1.default);
app.use(notify_1.default);
app.use(conversation_1.default);
app.use(messages_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.httpServer = (0, http_1.createServer)(app); // Create an HTTP server
exports.io = new socket_io_1.Server(exports.httpServer, {
    cors: {
        origin: 'https://instagram-neon-six.vercel.app', // Allow only this origin
        methods: ['GET', 'POST']
    }
});
exports.users = [];
const addUser = (userId, socketId) => {
    !exports.users.some((user) => user.userId === userId) &&
        exports.users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    exports.users = exports.users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return exports.users.find((user) => user.userId == userId);
};
exports.getUser = getUser;
exports.io.on('connection', (socket) => {
    socket.on('register', (userId) => {
        addUser(userId, socket.id);
        exports.io.emit("getUsers", exports.users);
    });
    socket.on("sendLikeNotification", ({ sender_id, receiver_id }) => {
        var _a;
        if (sender_id === receiver_id)
            return;
        const user = (0, exports.getUser)(receiver_id);
        exports.io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("getLikeNotification", {
            event: 'like',
            sender_id,
            receiver_id
        });
    });
    socket.on("sendFollowNotification", ({ sender_id, receiver_id }) => {
        var _a;
        const user = (0, exports.getUser)(receiver_id);
        exports.io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("getFollowNotification", {
            event: 'follow',
            sender_id,
            receiver_id
        });
    });
    socket.on("sendCommentNotification", ({ sender_id, receiver_id }) => {
        var _a;
        if (sender_id === receiver_id)
            return;
        const user = (0, exports.getUser)(receiver_id);
        exports.io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("getCommentNotification", {
            event: 'comment',
            sender_id,
            receiver_id
        });
    });
    socket.on("sendMessage", ({ sender_id, receiver_id, message }) => {
        var _a;
        const user = (0, exports.getUser)(receiver_id);
        exports.io.to((_a = user === null || user === void 0 ? void 0 : user.socketId) !== null && _a !== void 0 ? _a : "").emit("getMessage", {
            event: 'message',
            sender_id,
            receiver_id,
            message
        });
    });
    socket.on('disconnect', () => {
        removeUser(socket.id);
        exports.io.emit("getUsers", exports.users);
    });
});
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.set('strictQuery', true);
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) {
            throw new Error('MONGODB_URI not found in environment variables');
        }
        yield mongoose_1.default.connect(mongodbUri);
        console.log('Connected to MongoDB!');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
});
const startServer = () => {
    exports.httpServer.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT} 🚀`);
    });
};
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDB();
    startServer();
});
init();
