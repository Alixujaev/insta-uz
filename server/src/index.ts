import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './routes/auth';
import UserRoutes from './routes/user';
import PostRoutes from './routes/post';
import StoryRoutes from './routes/story';
import NotificationRoutes from "./routes/notify"
import ConversationRoutes from "./routes/conversation";
import MessageRoutes from "./routes/messages"
import { createServer } from 'http'; // Import the http module
import { Server as SocketIOServer } from 'socket.io'; // Import socket.io


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: 'https://insta-uz.vercel.app', // Allow only this origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(PostRoutes);
app.use(StoryRoutes);
app.use(NotificationRoutes);
app.use(ConversationRoutes);
app.use(MessageRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


export const httpServer = createServer(app); // Create an HTTP server
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: 'https://insta-uz.vercel.app', // Allow only this origin
    methods: ['GET', 'POST']
  }
});

export let users: { userId: string, socketId: string }[] = [];

const addUser = (userId: string, socketId: string) => {
  !users.some((user: { userId: string; socketId: string; }) => user.userId === userId) &&
    users.push({ userId, socketId });
}

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
}

export const getUser = (userId: string) => {
  return users.find((user) => user.userId == userId);
}

io.on('connection', (socket) => {
  socket.on('register', (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
  });

  socket.on("sendLikeNotification", ({sender_id, receiver_id}) => {
    if(sender_id === receiver_id) return;

    const user = getUser(receiver_id);

    io.to(user?.socketId ?? "").emit("getLikeNotification", {
      event: 'like',
      sender_id,
      receiver_id
    });
  })

  socket.on("sendFollowNotification", ({sender_id, receiver_id}) => {
    const user = getUser(receiver_id);

    io.to(user?.socketId ?? "").emit("getFollowNotification", {
      event: 'follow',
      sender_id,
      receiver_id
    });

  })

  socket.on("sendCommentNotification", ({sender_id, receiver_id}) => {
    if(sender_id === receiver_id) return;
    
    const user = getUser(receiver_id);

    io.to(user?.socketId ?? "").emit("getCommentNotification", {
      event: 'comment',
      sender_id,
      receiver_id
    });

  })

  socket.on("sendMessage", ({sender_id, receiver_id, message}) => {
    const user = getUser(receiver_id);
    
    io.to(user?.socketId ?? "").emit("getMessage", {
      event: 'message',
      sender_id,
      receiver_id,
      message
    })
  })


  socket.on('disconnect', () => {
      removeUser(socket.id);
      io.emit("getUsers", users);
  });
});

const connectToDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

const startServer = () => {
  httpServer.listen(PORT, () => { // Start the HTTP server, not the Express app
    console.log(`Server is listening at http://localhost:${PORT} 🚀`);
  });
};

const init = async () => {
  await connectToDB();
  startServer();
};

init();
