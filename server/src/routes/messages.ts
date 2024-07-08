import {Router} from "express";
import Messages from "../modules/Messages";
import Conversation from "../modules/Conversation";
import { verifyToken } from "../middlewares/utils";

const router = Router();

router.post("/api/messages", async (req, res) => {
  const newMessage = new Messages(req.body);

  try {
    const savedMessages = await newMessage.save();
    res.status(200).send({ success: true, data: savedMessages });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при создании диалога', error });
  }
})


router.get("/api/messages/:conversationId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      _id: req.params.conversationId
    }).select('members').select("updatedAt").populate('members', 'profile_img username full_name');
    const messages = await Messages.find({
      conversationId: req.params.conversationId
    });

    if(conversation.length > 0){
      res.send({ success: true, data: {messages, conversation} });
    }else{
      res.status(404).send({ success: false, message: 'Диалог не найден' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
  }
})

router.get("/api/messages-user/:userId", verifyToken, async(req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $all: [req.body.user.id, req.params.userId] }
    }).select('members').select("updatedAt").populate('members', 'profile_img username full_name');

    const messages = await Messages.find({
      conversationId: conversation[0]._id
    })    

    if(conversation.length > 0){
      res.send({ success: true, data: {messages, conversation} });
    }else{
      res.status(404).send({ success: false, message: 'Диалог не найден' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
    
  }
})


export default router;