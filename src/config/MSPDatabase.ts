export class MSPDatabase {
    public static MSP_SCHEMA: string = process.env.MYSQL_DB_SCHEMA;
    public static AFFILIATIONS: string = 'affiliations';
    public static USERS: string = 'users';
    public static USER_AUTHENTICATION: string = 'users_authentication';
}