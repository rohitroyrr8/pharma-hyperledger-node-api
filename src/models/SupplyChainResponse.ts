export class SupplyChainResponse {
    private status: number;
    private message: string;
    private data: any;
    private error: any;

    constructor(status?: any, message?: any, data?: any, error?: any) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    /**
     * Getter $status
     * @return {number}
     */
	public get $status(): number {
		return this.status;
	}

    /**
     * Getter $message
     * @return {string}
     */
	public get $message(): string {
		return this.message;
	}

    /**
     * Getter $data
     * @return {any}
     */
	public get $data(): any {
		return this.data;
	}

    /**
     * Getter $error
     * @return {any}
     */
	public get $error(): any {
		return this.error;
	}

    /**
     * Setter $status
     * @param {number} value
     */
	public set $status(value: number) {
		this.status = value;
	}

    /**
     * Setter $message
     * @param {string} value
     */
	public set $message(value: string) {
		this.message = value;
	}

    /**
     * Setter $data
     * @param {any} value
     */
	public set $data(value: any) {
		this.data = value;
	}

    /**
     * Setter $error
     * @param {any} value
     */
	public set $error(value: any) {
		this.error = value;
	}

}