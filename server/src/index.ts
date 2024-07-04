import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './routes/auth';
import UserRoutes from './routes/user';
import PostRoutes from './routes/post';
import StoryRoutes from './routes/story';
import NotificationRoutes from "./routes/notify"
import { createServer } from 'http'; // Import the http module
import { Server as SocketIOServer } from 'socket.io'; // Import socket.io


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(PostRoutes);
app.use(StoryRoutes);
app.use(NotificationRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export const users = {};

export const httpServer = createServer(app); // Create an HTTP server
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST']
  }
});


io.on('connection', (socket) => {
  console.log('New client connected with socket ID:', socket.id);

  socket.on('register', (userId) => {
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
      if (userId) {
          users[userId] = socket.id;
          console.log(`User ${userId} registered with socket ID ${socket.id}`);
      } else {
          console.log('User ID is undefined during registration');
      }
  });

  socket.on('disconnect', () => {
      for (const userId in users) {
          if (users[userId] === socket.id) {
              delete users[userId];
              console.log(`User ${userId} with socket ID ${socket.id} disconnected`);
              break;
          }
      }
  });
});

const connectToDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI);
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
