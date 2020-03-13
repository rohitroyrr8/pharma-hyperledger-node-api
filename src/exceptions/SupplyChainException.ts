export class SupplyChainException implements Error {
    name: string;
    message: string
    stack?: string;

    constructor(message: string) {
        this.name = 'SupplyChainException';
        this.message = message;
    }
}