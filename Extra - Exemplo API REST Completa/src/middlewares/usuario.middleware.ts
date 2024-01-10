import { Request, Response, NextFunction } from 'express';
import { atualizarUsuarioSchema, criarUsuarioSchema } from "../schemas/usuario.validation";

export const validarCriacaoUsuario = (req: Request, res: Response, next: NextFunction) => {
    const { error } = criarUsuarioSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

export const validarAtualizaoUsuario = (req: Request, res: Response, next: NextFunction) => {
    const { error } = atualizarUsuarioSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};