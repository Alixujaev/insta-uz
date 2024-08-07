import {Router} from "express"
import { verifyToken } from "../middlewares/utils";
import User from "../modules/User";
import Story from "../modules/Story";
import cron from 'node-cron';

const router = Router()

router.post("/api/create-story", verifyToken, async (req: any, res) => {
  const { description, image} = req.body;
  if (!image) {
    return res.status(400).send({ success: false, message: 'Заполните все поля' });
  }


  try {
    const author = await User.findById(req.body.user.id);
    const newPost = await Story.create({author: author, author_id: req.body.user.id, description, image});
    await User.updateOne({ _id: req.body.user.id }, { $push: { stories: newPost._id } });
    res.send({ success: true, message: 'Сторис создан', data: newPost });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при создании поста', error });
  }
})

router.get("/api/story/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  try {
    let story = await Story.findById(id);
    res.send({ success: true, message: 'Пост получен', data: story });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении поста', error });
  }
})

router.put("/api/view/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  try {
    let story = await Story.findById(id);
      console.log(!story?.views.includes(req.body.user.id));

    if(story?.views.includes(req.body.user.id)) return 
      
    story = await Story.findByIdAndUpdate(id, {$push: {views: req.body.user.id}});
    res.send({ success: true, message: 'Пост получен', data: story });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении поста', error });
  }
})

router.delete("/api/delete-story/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;

  try {
    await User.updateOne({ _id: req.body.user.id }, { $pull: { stories: id } });
    await Story.findByIdAndDelete({ _id: id });
    res.send({ success: true, message: 'Пост удален' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при удалении поста', error });
  }
})

router.get("/api/viewers/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;

  const story = await Story.findById(id);

  if(story?.author_id !== req.body.user.id) {
    return res.status(400).send({ success: false, message: 'Вы не можете просмотреть подписчиков' });
  }

  try {
    const viewers = await Story.findById(id).select('views').populate('views', 'profile_img username full_name');
    res.status(200).send({ success: true, data: viewers });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении подписчиков', error });
  }
  
})

router.get("/api/stories", verifyToken, async (req: any, res) => {
  const myId = req.body.user.id;
  try {
    const user = await User.findById(myId);
    const myStory = await Story.find({author_id: myId});
    const stories = await Story.find({author_id: {$in: user?.following}});
    res.send({ success: true, message: 'Посты получены', data: [...stories, ...myStory] });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении постов', error });
  }
})


cron.schedule('0 * * * *', async () => {
  const twentyFourHoursAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  try {
    const oldStories = await Story.find({ createdAt: { $lte: twentyFourHoursAgo } });
    for (const story of oldStories) {
      await User.updateOne({ _id: story.author_id }, { $pull: { stories: story._id } });
      await Story.findByIdAndDelete(story._id);
    }
    console.log('Old stories deleted');
  } catch (error) {
    console.error('Error deleting old stories:', error);
  }
});


export default router