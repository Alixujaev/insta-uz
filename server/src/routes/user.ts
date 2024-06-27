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
  const userIdToFollow = req.params.id;
  const userId = req.body.user?.id;

  if (!userId) {
    return res.status(400).send({ success: false, message: 'Пользователь не найден' });
  }

  try {
    const userBeingFollowed = await User.findByIdAndUpdate(
      userIdToFollow,
      { $push: { followers: userId } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { following: userIdToFollow } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: 'Вы подписались на пользователя',
      data: { userBeingFollowed, updatedUser }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Ошибка при подписке',
      error: error.message
    });
  }
});

router.put("/api/unfollow/:id", verifyToken, async (req: any, res) => {
  const userIdToUnfollow = req.params.id;
  const userId = req.body.user?.id;

  if (!userId) {
    return res.status(400).send({ success: false, message: 'Пользователь не найден' });
  }

  try {
    const userBeingUnfollowed = await User.findByIdAndUpdate(
      userIdToUnfollow,
      { $pull: { followers: userId } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: userIdToUnfollow } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: 'Вы отписались от пользователя',
      data: { userBeingUnfollowed, updatedUser }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Ошибка при отписке',
      error: error.message
    });
  }
});

router.get("/api/followers/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select('followers').populate('followers', 'profile_img username full_name');
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении подписчиков', error });
  }
  
})

router.get("/api/following/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select('following').populate('following', 'profile_img username full_name');
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении подписок', error });
  }
})

router.put("/api/follower/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  const myId = req.body.user?.id;

  if (!myId) {
    return res.status(400).send({ success: false, message: 'Пользователь не найден' });
  }

  try {
        const updatedUser = await User.findByIdAndUpdate(
          myId,
          { $pull: { followers: id } },
          { new: true }
        );
  
    res.status(200).send({ success: true, message: 'Подписчик удален', data: updatedUser })
  } catch (error) {
    console.log(error);
    
    res.status(500).send({ success: false, message: 'Ошибка при удалении подписчика', error });
  }
})


export default router