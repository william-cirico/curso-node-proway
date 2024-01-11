export class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: number;

    constructor(name: string, httpCode: number, description: string) {
        super(description);
        this.name = name;
        this.httpCode = httpCode;
    }
}