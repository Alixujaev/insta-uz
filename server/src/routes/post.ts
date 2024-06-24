import { Router } from "express";
import multer from "multer"
import path from "path"
import { verifyToken } from "../middlewares/utils";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'publiv/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


router.post("/api/upload", verifyToken, upload.single("file"), (req, res) => {
  console.log(req);
  
  // const file = req.file;
  // if (!file) {
  //   return res.status(400).send({ success: false, message: 'Файл не выбран' });
  // }
  // return res.status(200).send({ success: true, message: 'Файл успешно загружен', data: file.path });

})

export default router