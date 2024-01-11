import { BaseError } from "./base.error";

export class CamposNaoInformadosError extends BaseError {
    constructor(camposNaoInformados: string[]) {
        super("CamposNaoInformadosError", 400, `Campo(s) faltando: ${camposNaoInformados.join(", ")}`);
    }
}