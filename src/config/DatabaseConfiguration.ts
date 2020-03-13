import * as mysql from "mysql";
import { CompanyType } from "../enums/CompanyType";

export class DatabaseConfiguration {
    public async getMySqlConnection(companyType: CompanyType): Promise<mysql.Connection> {
        let connectionAttributes: any = {};

        switch(companyType) {
            case CompanyType.MANUFACTURER :
                connectionAttributes = await this.createConnectionAttributes(process.env.MANUFACTURER_MSP_SCHEMA, process.env.MANUFACTURER_MSP_HOST, process.env.MANUFACTURER_MSP_PASSWORD, process.env.MANUFACTURER_MSP_USER);
                break;
            case CompanyType.TRANSPORTER :
                connectionAttributes = await this.createConnectionAttributes(process.env.TRANSPORTER_MSP_SCHEMA, process.env.TRANSPORTER_MSP_HOST, process.env.TRANSPORTER_MSP_PASSWORD, process.env.TRANSPORTER_MSP_USER);
                break;
            case CompanyType.DISTRIBUTOR :
                connectionAttributes = await this.createConnectionAttributes(process.env.DISTRIBUTOR_MSP_SCHEMA, process.env.DISTRIBUTOR_MSP_HOST, process.env.DISTRIBUTOR_MSP_PASSWORD, process.env.MANUFACTURER_MSP_USER);
                break;
            case CompanyType.RETAILER :
                connectionAttributes = await this.createConnectionAttributes(process.env.RETAILER_MSP_SCHEMA, process.env.RETAILER_MSP_HOST, process.env.RETAILER_MSP_PASSWORD, process.env.RETAILER_MSP_USER);
                break;
            case CompanyType.CONSUMER :
                connectionAttributes = await this.createConnectionAttributes(process.env.CONSUMER_MSP_SCHEMA, process.env.CONSUMER_MSP_HOST, process.env.CONSUMER_MSP_PASSWORD, process.env.CONSUMER_MSP_USER);
                break;
        }

        const mySqlConnection: mysql.Connection = mysql.createConnection(connectionAttributes);
        return mySqlConnection;
    }

    public async createConnectionAttributes(database: string, host: string, password: string, user: string): Promise<any> {
        const connectionAttributes: any = {};
        connectionAttributes.database = database;
        connectionAttributes.host = host;
        connectionAttributes.password = password;
        connectionAttributes.user = user;
        
        return connectionAttributes;
    }
}