import { Router } from "express";
import multer from "multer"
import { verifyToken } from "../middlewares/utils";
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import storage from "../utils/storage";
import Post from "../modules/Post";
import User from "../modules/User";
import Comment from "../modules/Comment";
import { ObjectId } from "mongodb";
import Notification from "../modules/Notification";
import { getUser, io, users } from "..";

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
    const author = await User.findById(req.body.user.id);
    const newPost = await Post.create({author: author, author_id: req.body.user.id, description, image});
    await User.updateOne({ _id: req.body.user.id }, { $push: { posts: newPost._id } });
    res.send({ success: true, message: 'Пост создан', data: newPost });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при создании поста', error });
  }
})

router.get("/api/user-posts/:id", async (req: any, res) => {
  const id = req.params.id;
  try {    
    const posts = await Post.find({author_id: id});


    
    res.send({ success: true, message: 'Посты получены', data: posts });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
  }
})

router.put("/api/like/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  const post = await Post.findById(req.params.id);

  if(post.likes.includes(req.body.user.id)) {
    return res.status(400).send({ success: false, message: 'Вы уже поставили лайк' });
  }
  
  
  try {
    
    const post = await Post.findByIdAndUpdate({ _id: id }, { $push: { likes: req.body.user.id } });
    const authorId = post.author_id

    if(authorId !== req.body.user.id) {
      await Notification.create({
        sender: req.body.user.id,
        receiver: authorId,
        post: post,
        type: 'like'
    })
    }

    res.send({ success: true, message: 'Лайк поставлен' });
  } catch (error) {
    console.log(error);
      
  }
})

router.put("/api/unlike/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  const post = await Post.findById(req.params.id);

  if(!post.likes.includes(req.body.user.id)) {
    return res.status(400).send({ success: false, message: 'Вы не поставили лайк' });
  }
  
  
  try {
    await Post.findByIdAndUpdate({ _id: id }, { $pull: { likes: req.body.user.id } });
    res.send({ success: true, message: 'Лайк снят' });
  } catch (error) {
    console.log(error);
      
  }
})

router.post("/api/comment", verifyToken, async (req: any, res) => {
  const { comment, postId } = req.body;
  if ( !comment) {
    return res.status(400).send({ success: false, message: 'Заполните все поля' });
  }

  try {
    const author = await User.findById(req.body.user.id);
    const newComment = await Comment.create({
      author: {
        id: author._id,
        username: author.username,
        profile_img: author.profile_img
      },
      post_id: postId,
      comment
    })
    const post = await Post.findByIdAndUpdate({ _id: postId }, { $push: { comments: req.body.user.id } });  
    const authorId = post.author_id


    if(authorId !== req.body.user.id) {
      await Notification.create({
        sender: req.body.user.id,
        receiver: authorId,
        post: post,
        comment,
        type: 'comment'
    })
  
   
    }


    
    res.send({ success: true, message: 'Комментарий добавлен', data: newComment });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при добавлении комментария', error });
  }
})

router.get("/api/comments/:id", async (req:any, res) => {
  const id = req.params.id;

  try {
    const comments = await Comment.find({post_id: id});
    
    res.send({ success: true, message: 'Комментарии получены', data: comments });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении комментариев', error });
  }
})

router.delete("/api/delete-post/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  // if (post.author_id !== req.body.user.id) {
  //   return res.status(400).send({ success: false, message: 'Вы не можете удалить пост' });
  // }

  try {
    await User.updateOne({ _id: req.body.user.id }, { $pull: { posts: id } });
    await Post.findByIdAndDelete({ _id: id });
    res.send({ success: true, message: 'Пост удален' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при удалении поста', error });
  }
})

router.get("/api/post/:id", async (req: any, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.send({ success: true, message: 'Пост получен', data: post });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении поста', error });
  }
})

router.put("/api/post/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  // if (post.author_id !== req.body.user.id) {
  //   return res.status(400).send({ success: false, message: 'Вы не можете редактировать пост' });
  // }

  try {
    await Post.findByIdAndUpdate({ _id: id }, { description: req.body.description });
    res.send({ success: true, message: 'Пост отредактирован' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при редактировании поста', error });
  }
})


router.put("/api/save/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  const myId = req.body.user?.id;
  
  try {
    const user = await User.findById(myId);
    let updatedUser;

    if(user.saved.includes(id)) {
      updatedUser = await User.findByIdAndUpdate(
        myId,
        { $pull: { saved: id } },
        { new: true }
      );
    }else{
      updatedUser = await User.findByIdAndUpdate(
        myId,
        { $push: { saved: id } },
        { new: true }
      );
    }

    res.status(200).send({ success: true, message: 'Пост сохранен', data: updatedUser })
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при сохранении поста', error });
  }
})

router.get("/api/saved", verifyToken, async (req: any, res) => {
  try {
    const saved = await User.findById(req.body.user.id).select('saved').populate('saved', '_id image description author likes comments author_id createdAt');
    
    res.send({ success: true, message: 'Посты получены', data: saved });
  }catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
  }
})


router.get("/api/following-posts", verifyToken, async (req: any, res) => {
  const myId = req.body.user.id;


  try {
    const user = await User.findById(myId);
    const myPost = await Post.find({author_id: myId});
    const subbed = await Post.find({author_id: {$in: user.following}});

    
    res.send({ success: true, message: 'Посты получены', data: [...subbed, ...myPost] });
  }catch (error) {
    console.log(error);
    
    res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
  }
})





export default router