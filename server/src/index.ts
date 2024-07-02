import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from "cors"
import AuthRoutes from "./routes/auth"
import UserRoutes from "./routes/user"
import PostRoutes from "./routes/post"
import StoryRoutes from "./routes/story"

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


app.get("/", (req, res) => {
  res.send("Hello World!");
})



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
  app.listen(PORT, () => {
    console.log(`Express server is listening at http://localhost:${PORT} 🚀`);
  });
};

const init = async () => {
  await connectToDB();
  startServer();
};

init();
