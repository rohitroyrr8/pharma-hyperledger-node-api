export class VirtualOrganization {
    private superOrg: string;
    private virtualOrganization: string;

    constructor(virtualOrganization: any) {
        if(virtualOrganization) {
            this.superOrg = virtualOrganization.superOrg;
            this.virtualOrganization = virtualOrganization.virtualOrganization;
        }
    }


    /**
     * Getter $superOrg
     * @return {string}
     */
	public get $superOrg(): string {
		return this.superOrg;
	}

    /**
     * Getter $virtualOrganization
     * @return {string}
     */
	public get $virtualOrganization(): string {
		return this.virtualOrganization;
	}

    /**
     * Setter $superOrg
     * @param {string} value
     */
	public set $superOrg(value: string) {
		this.superOrg = value;
	}

    /**
     * Setter $virtualOrganization
     * @param {string} value
     */
	public set $virtualOrganization(value: string) {
		this.virtualOrganization = value;
	}

}