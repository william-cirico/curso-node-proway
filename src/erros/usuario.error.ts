import { BaseError } from "./base.error";

export class UsuarioIDNaoEncontradoError extends BaseError {
    constructor(id: number) {
        super("UsuarioIDNaoEncontradoError", 404, `Usuário com o ID ${id} não foi encontrado`);
    }
}

export class UsuarioEmailJaCadastradoError extends BaseError {
    constructor(email: string) {
        super("UsuarioEmailJaCadastradoError", 409, `Já existe um usuário utilizando o e-mail '${email}'`);
    }
}

export class CredenciaisInvalidasError extends BaseError {
    constructor() {
        super("CredenciaisInvalidasError", 401, "Credenciais inválidas");
    }
}