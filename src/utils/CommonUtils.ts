export class CommonUtils {
    static getErrorStatus(error): number {
        switch(error.name) {
            case 'InvalidEnumError': return 400;
            case 'InvalidInputError': return 400;
            case 'TypeMismatchError': return 400;
            case 'UnAuthorizedError': return  401;
            case 'SupplyChainException': return 400;
            default: return 500;
        }
    }
}