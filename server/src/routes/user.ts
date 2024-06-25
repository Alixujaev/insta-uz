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
      posts: user.posts,
      stories: user.stories
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
        posts: user.posts,
      }
    } });

      
  } catch (error) {
    console.log(error);
    
  }
})


export default router