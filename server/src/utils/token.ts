import jwt from "jsonwebtoken"

export function generateNewToken(id:string){
  const jwtSecret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign({ id }, jwtSecret, { expiresIn: "30d" })
}





