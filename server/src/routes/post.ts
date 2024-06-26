import { Router } from "express";
import multer from "multer"
import { verifyToken } from "../middlewares/utils";
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import storage from "../utils/storage";
import Post from "../modules/Post";
import User from "../modules/User";

const router = Router();
dotenv.config();


//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: storage })


router.post("/api/upload", upload.single("file"), verifyToken, async (req: any, res) => {    
  const file = req.file;

  cloudinary.uploader.upload(file.path, function (error, result) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: error,
      })
    }

    res.send({
      success: true,
      message: "Файл успешно загружен",
      data: result
  })
  
})
})

router.post("/api/create-post", verifyToken, async (req: any, res) => {
  const { description, image} = req.body;
  if ( !description || !image) {
    return res.status(400).send({ success: false, message: 'Заполните все поля' });
  }

  try {
    const newPost = await Post.create({author_id: req.body.user.id, description, image});
    await User.updateOne({ _id: req.body.user.id }, { $push: { posts: newPost._id } });
    res.send({ success: true, message: 'Пост создан', data: newPost });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при создании поста', error });
  }
})

router.get("/api/user-posts/:id", async (req: any, res) => {
  try {    
    const id = req.params.id;
    const posts = await Post.find({author_id: id});
    
    res.send({ success: true, message: 'Посты получены', data: posts });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
  }
})

export default router