import { Router } from "express";
import User from "../modules/User";
import bcrypt from "bcrypt"
import { generateNewToken } from "../utils";
import { sendConfirmationCode, verifyConfirmationCode } from "../../services/confirmationService";

const router = Router()
const tempUserStorage = {}



router.post("/api/registration", async (req, res) => {
    try {
        const { email, username, password } = req.body;
    
        const existEmail = await User.findOne({ email });
        if (existEmail) {
          return res.status(400).send({ success: false, message: 'Этот адрес электронной почты уже зарегистрирован', data: null });
        }
    
        const existUser = await User.findOne({ username });
        if (existUser) {
          return res.status(400).send({ success: false, message: 'Это имя пользователя уже занято', data: null });
        }
    
        const hashedPass = await bcrypt.hash(password, 10);
    
        // Store user data temporarily
        tempUserStorage[email] = { ...req.body, password: hashedPass };
    
        const code = await sendConfirmationCode(email);
        res.status(200).send({
          success: true,
          message: 'Код подтверждения отправлен на ваш email'
        });
    
      } catch (error) {
        res.status(500).send({ success: false, message: 'Ошибка при регистрации', error });
      }
})


router.post('/api/verify-code', async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).send({ success: false, message: 'Email и код обязательны' });
    }

    try {
        const isValid = verifyConfirmationCode(email, code);

        if(isValid) {
            const existUser = await User.findOne({ email });
            
            
            if (existUser) {
              const token = generateNewToken(existUser._id)
              res.status(200).send({
                success: true,
                message: "Ваш адрес электронной почты успешно подтвержден",
                data: {
                  user: existUser,
                  token
                }
              })
            }

            const userData = tempUserStorage[email];

            if(!userData){
                res.status(400).send({
                    success: false,
                    message: 'Пользовательские данные не найдены'
                })
            }


            const newUser = await User.create({...userData, followers: [], following: []})
            const token = generateNewToken(newUser._id)

            delete tempUserStorage[email]

            res.status(200).send({
                success: true,
                message: 'Код успешно подтвержден, пользователь создан',
                data: {
                    user: {
                      id: newUser._id,
                      full_name: newUser.full_name,
                      username: newUser.username,
                      email: newUser.email,
                      followers: newUser.followers,
                      following: newUser.following
                    },
                    token
                }
            })
        }else {
            res.status(400).send({ success: false, message: 'Неверный код' });
        }
    } catch (error) {
      console.log(error);
      
        res.status(500).send({ success: false, message: 'Ошибка при проверке кода', error });
      }
});


router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ success: false, message: 'Пользователь не найден' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ success: false, message: 'Неверный пароль' });
    }

    const token = generateNewToken(user._id)
    res.status(200).send({
      success: true,
      message: 'Аутентификация прошла успешно',
      data: {
        user: {
          id: user._id,
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          followers: user.followers,
          following: user.following
        },
        token
      }
    })
})


router.post("/api/forgot-password", async (req, res) => {
  const {email} = req.body

  const existUser = await User.findOne({email})
  if (!existUser) {
    return res.status(400).send({ success: false, message: 'Пользователь не найден' });
  }

  const code = await sendConfirmationCode(email);
  res.status(200).send({
    success: true,
    message: 'Код подтверждения отправлен на ваш email'
  });
})

export default router