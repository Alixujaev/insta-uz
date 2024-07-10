import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestWithHeader {
  header: (name: string) => string | undefined;
  body: { user: any };
}


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; 

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not defined." });
  }

  try {
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.body.user = decode;

  next();
  } catch (error) {
    res.status(400).send({ success: false, message: 'Некорректный токен.' });  
  }
}