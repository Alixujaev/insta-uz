import {Router} from "express";
import Messages from "../modules/Messages";

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
    const messages = await Messages.find({
      conversationId: req.params.conversationId
    });
    res.send({ success: true, data: messages });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Ошибка при получении диалогов', error });
  }
})


export default router;