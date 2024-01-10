import { ErrorRequestHandler } from "express";
import { BaseError } from "../error/base.error";

export const tratamentoErrosMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof BaseError) {
        return res.status(err.httpCode).json({ message: err.message });
    }

    res.status(500).json({ message: "Ocorreu um erro inesperado" });
};


