import { Router } from "express";
import User from "../modules/User";
import bcrypt from "bcrypt"
import { generateNewToken } from "../utils";
import { sendConfirmationCode, verifyConfirmationCode } from "../../services/confirmationService";

const router = Router()

// router.post("/api/registration", async (req, res) => {
//   try {
//     const existEmail = await User.findOne({ email: req.body.email })
//     const existUser = await User.findOne({username: req.body.username})

//     const hashedPass = await bcrypt.hash(req.body.password, 10)
//     const newUser = await User.create({
//       ...req.body,
//       password: hashedPass
//     })

//     if(existEmail){
//       res.status(400).send({ success: false, message: 'Этот адрес электронной почты уже зарегистрирован', data: null });
//       return
//     }

//     if(existUser){
//       res.status(400).send({ success: false, message: 'Это имя пользователя уже занято', data: null });
//       return
//     }

//     const token = generateNewToken(newUser._id)
    
//     res.send({
//       success: true,
//       message: 'Вы успешно зарегистрировались',
//       data: {
//         _id: newUser._id,
//         email: newUser.email,
//         full_name: newUser.full_name,
//         username: newUser.username,
//         token
//       }
//     });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to fetch todos' });
//   }
// })


router.post('/api/send-code', async (req, res) => {
  const { email } = req.body;

  if (!email) {
      return res.status(400).send('Email is required');
  }

  try {
      const code = await sendConfirmationCode(email);
      res.status(200).send('Confirmation code sent');
  } catch (error) {
      console.error(error, 'this is errorrrr');
      res.status(500).send('Error sending confirmation code');
  }
});



// Endpoint to verify confirmation code
router.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
      return res.status(400).send('Email and code are required');
  }

  const isValid = verifyConfirmationCode(email, code);
  if (isValid) {
      res.status(200).send('Code verified successfully');
  } else {
      res.status(400).send('Invalid code');
  }
});

export default router