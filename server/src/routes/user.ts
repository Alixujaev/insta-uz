import { Router } from "express";
import { verifyToken } from "../middlewares/utils";
import User from "../modules/User";

const router = Router();


router.get("/api/about-me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);
    
    res.status(200).send({ success: true, data: {
      id: user._id,
      email: user.email,
      username: user.username,
      full_name: user.full_name,
      followers: user.followers,
      following: user.following,
      about: user.about,
      posts: user.posts,
      stories: user.stories,
      profile_img: user.profile_img
      
    } });
      
  } catch (error) {
    console.log(error);
    
  }
})

router.get("/api/:username", async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});    
    
    res.status(200).send({ success: true, data: {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        followers: user.followers,
        following: user.following,
        profile_img: user.profile_img,
        about: user.about,
        posts: user.posts,
      }
    } });

      
  } catch (error) {
    console.log(error);
    
  }
})

router.put("/api/update-user", verifyToken, async (req, res) => {
  try {
    
    const user = await User.findByIdAndUpdate(req.body.user.id, {
      ...req.body,
      full_name: req.body.fullName
    });
    
    res.status(200).send({ success: true, data: {
      id: user._id,
      email: user.email,
      username: user.username,
      full_name: user.full_name,
      followers: user.followers,
      following: user.following,
      about: user.about,
      posts: user.posts,
      stories: user.stories
    } });
      
  } catch (error) {
    console.log(error);
    
  }
})

router.get("/api/exist/:username", async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});

    if(user){
      return res.status(400).send({ success: false, message: 'Такое имя пользователя уже занято' });
    }else{
      return res.status(200).send({ success: true, message: 'Имя пользователя свободно' });
    }
    
  } catch (error) {
    console.log(error);
    
  }
})

router.get("/api/search/:username", async (req, res) => {
  const {username} = req.params;

  try {
    const users = await User.find({username: {$regex: username, $options: 'i'}});
    
    res.status(200).send({ success: true, data: users });
  } catch (error) {

    res.status(500).send({ success: false, message: 'Ошибка при поиске', error });
  }
})

router.put("/api/follow/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    const me = await User.findById(req.body.user.id);

    await User.findByIdAndUpdate({ _id: id }, { $push: { followers: {
      id: req.body.user.id,
      username: me.username,
      profile_img: me.profile_img,
      full_name: me.full_name
    } } });
    await User.findByIdAndUpdate({ _id: req.body.user.id }, { $push: { following: {
      id: id,
      username: user.username,
      profile_img: user.profile_img,
      full_name: user.full_name
    } } });
    
    
 
    res.status(200).send({ success: true, message: 'Вы подписались на пользователя', data: user });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при подписке', error });
  }
})

router.put("/api/unfollow/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndUpdate({ _id: id }, { $pull: { followers: req.body.user.id } });
    await User.findByIdAndUpdate({ _id: req.body.user.id }, { $pull: { following: id } });
    res.send({ success: true, message: 'Вы отписались от пользователя' });
  } catch (error) {
    res.send({ success: false, message: 'Ошибка при отписке', error });
  }
})



export default router