import Joi from "joi";

// Lista dos erros para customização: https://github.com/hapijs/joi/blob/master/API.md#list-of-errors
export const criarUsuarioSchema = Joi.object({
    nome: Joi.string().required().messages({
        "string.base": "Nome deve ser um texto",
        "string.empty": "Nome não pode estar vazio",
        "any.required": "Nome é obrigatório"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "E-mail deve ser um texto",
        "string.email": "E-mail deve ser um endereço de e-mail válido",
        "any.required": "E-mail é obrigatório"
    }),
    senha: Joi.string().min(8).required().messages({
        "string.base": "Senha deve ser um texto",
        "string.min": "A senha precisa ter no mínimo 8 caracteres",
        "any.required": "Senha é obrigatória"
    })
});

export const atualizarUsuarioSchema = Joi.object({
    nome: Joi.string().required().messages({
        "string.base": "Nome deve ser um texto",
        "string.empty": "Nome não pode estar vazio",
        "any.required": "Nome é obrigatório"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "E-mail deve ser um texto",
        "string.email": "E-mail deve ser um endereço de e-mail válido",
        "any.required": "E-mail é obrigatório"
    }),
    senha: Joi.string().optional().min(8).messages({
        "string.base": "Senha deve ser um texto",
        "string.min": "A senha precisa ter no mínimo 8 caracteres",
    })
});