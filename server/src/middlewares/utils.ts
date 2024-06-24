import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; 


  try {
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.body.user = decode;

  next();
  } catch (error) {
    res.status(400).send({ success: false, message: 'Некорректный токен.' });  
  }
}