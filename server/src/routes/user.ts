import { Router } from "express";
import { verifyToken } from "../middlewares/utils";
import User from "../modules/User";

const router = Router();


router.get("/api/about-me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);
    
    res.status(200).send({ success: true, data: {
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


export default router