import {Router} from "express"
import { verifyToken } from "../middlewares/utils";
import Notification from "../modules/Notification";

const router = Router()

router.get("/api/notifications", verifyToken, async(req, res) => {
  const myId = req.body.user.id;
  try {
    const notifications = await Notification.find({receiver: myId}).populate('sender', 'profile_img username full_name').populate('post', 'image _id');
    res.send({ success: true, data: notifications });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении уведомлений', error });
  }
})


export default router