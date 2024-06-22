import jwt from "jsonwebtoken"



export function generateNewToken(id){
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}