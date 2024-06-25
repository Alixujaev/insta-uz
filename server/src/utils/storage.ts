import multer from "multer"

//storage
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }                                                    
}); 

export default storage