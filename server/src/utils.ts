import jwt from "jsonwebtoken"
import cloudinary from "cloudinary"



export function generateNewToken(id){
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}





