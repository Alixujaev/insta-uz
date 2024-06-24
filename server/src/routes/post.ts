import { Request, Router } from "express";
import multer from "multer"
import path from "path"
import { verifyToken } from "../middlewares/utils";
import storage from "../storage"

const router = Router();


const upload = multer({ storage: storage })


router.post("/api/upload", upload.single("file"), verifyToken, (req: any, res) => {    
  const file = req.file;

  console.log(file);

  res.send('Done');
  
  // if (!file) {
  //   return res.status(400).send({ success: false, message: 'Файл не выбран' });
  // }
  
  // return res.status(200).send({ success: true, message: 'Файл успешно загружен', data: file });

})

export default router