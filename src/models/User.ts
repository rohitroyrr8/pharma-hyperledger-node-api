export class User {
    private name: string;
    private email: string;
    private password: string;
    private virtualOrganization: string;
    private organization: string;
    private role: string;
    private countryCode: string;
    private fabricOrg: string;
    
    constructor(userDto: any) {
        if(userDto) {
            this.name = userDto.name;
            this.email = userDto.email;
            this.password = userDto.password;
            this.virtualOrganization = userDto.virtualOrganization;
            this.organization = userDto.organization;
            this.role = userDto.role;
            this.countryCode = userDto.countryCode;
            this.fabricOrg = userDto.fabricOrg;
        }
    }

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $email
     * @return {string}
     */
	public get $email(): string {
		return this.email;
	}

    /**
     * Getter $password
     * @return {string}
     */
	public get $password(): string {
		return this.password;
	}

    /**
     * Getter $virtualOrganization
     * @return {string}
     */
	public get $virtualOrganization(): string {
		return this.virtualOrganization;
	}

    /**
     * Getter $role
     * @return {string}
     */
	public get $role(): string {
		return this.role;
	}

    /**
     * Getter $countryCode
     * @return {string}
     */
	public get $countryCode(): string {
		return this.countryCode;
	}

    /**
     * Getter $fabricOrg
     * @return {string}
     */
	public get $fabricOrg(): string {
		return this.fabricOrg;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $email
     * @param {string} value
     */
	public set $email(value: string) {
		this.email = value;
	}

    /**
     * Setter $password
     * @param {string} value
     */
	public set $password(value: string) {
		this.password = value;
	}

    /**
     * Setter $virtualOrganization
     * @param {string} value
     */
	public set $virtualOrganization(value: string) {
		this.virtualOrganization = value;
	}

    /**
     * Setter $role
     * @param {string} value
     */
	public set $role(value: string) {
		this.role = value;
	}

    /**
     * Setter $countryCode
     * @param {string} value
     */
	public set $countryCode(value: string) {
		this.countryCode = value;
	}

    /**
     * Setter $fabricOrg
     * @param {string} value
     */
	public set $fabricOrg(value: string) {
		this.fabricOrg = value;
	}

    /**
     * Getter $organization
     * @return {string}
     */
	public get $organization(): string {
		return this.organization;
	}

    /**
     * Setter $organization
     * @param {string} value
     */
	public set $organization(value: string) {
		this.organization = value;
	}

}