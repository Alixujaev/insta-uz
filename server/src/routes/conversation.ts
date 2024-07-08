import {Router} from "express";
import Conversation from "../modules/Conversation";

const router = Router();


router.post("/api/conversations", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  })


  try {
    const savedConversation = await newConversation.save();
    res.status(200).send({ success: true, data: savedConversation });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при создании диалога', error });
  }
})


router.get("/api/conversations/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] }
    })

    res.send({ success: true, data: conversations });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
  }
})
export default router;