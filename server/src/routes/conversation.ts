import {Router} from "express";
import Conversation from "../modules/Conversation";
import { verifyToken } from "../middlewares/utils";
const router = Router();


router.post("/api/conversations", verifyToken, async (req, res) => {
  const existConversation = await Conversation.findOne({
    members: { $all: [req.body.user.id, req.body.receiverId] }
  })

  const newConversation = new Conversation({
    members: [req.body.user.id, req.body.receiverId]
  })


  try {
    if(existConversation) {
      return res.status(200).send({ success: true, data: existConversation });
    }
    const savedConversation = await newConversation.save();
    res.status(200).send({ success: true, data: savedConversation });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при создании диалога', error });
  }
})


router.get("/api/conversations/:userId", verifyToken, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] }
    }).select('members').select("updatedAt").populate('members', 'profile_img username full_name');

    res.send({ success: true, data: conversations });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
  }
})

router.get("/api/conversation/:userId", verifyToken, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $all: [req.body.user.id, req.params.userId] }
    })

    if(conversation){
      res.send({ success: true, data: conversation });
    }else{
      res.status(404).send({ success: false, message: 'Диалог не найден' });
    }

  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
  }
})

router.delete("/api/conversations/:id", verifyToken, async (req: any, res) => {
  const id = req.params.id;
  try {
    await Conversation.findByIdAndDelete({ _id: id });
    res.send({ success: true, message: 'Диалог удален' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при удалении диалога', error });
  }
})


export default router;