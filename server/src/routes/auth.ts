import { Router } from "express";
import User from "../modules/User";
import bcrypt from "bcrypt"
import { generateNewToken } from "../utils";
import { sendConfirmationCode, verifyConfirmationCode } from "../../services/confirmationService";
import { UserInterface } from "../consts";

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


// Endpoint to verify confirmation code
router.post('/api/verify-code', async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).send({ success: false, message: 'Email и код обязательны' });
    }

    try {
        const isValid = verifyConfirmationCode(email, code);

        if(isValid) {
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
        res.status(500).send({ success: false, message: 'Ошибка при проверке кода', error });
      }
});

export default router