import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || "";

const decodeToken = (token: string) => {
    return jwt.verify(token, TOKEN_SECRET_KEY);
};

export const autenticacaoMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token?.trim()) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        const payload = decodeToken(token);
        res.locals.id = payload.sub;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: `Token inválido: ${error.message}`});
    }
}