import * as express from 'express';
import {FileSystemWallet, Gateway} from 'fabric-network';
import { SupplyChainResponse } from '../../models/SupplyChainResponse';
import { DatabaseConfiguration } from '../../config/DatabaseConfiguration';
import { Connection } from 'mysql';
import { CompanyType } from '../../enums/CompanyType';
import { VirtualOrganization } from '../../models/VirtualOrganization';
import { MSPDatabase } from '../../config/MSPDatabase';
import { User } from '../../models/User';
import * as SupplyChainFileUtils from '../../utils/SupplyChainFileUtils';
import { SupplyChainException } from '../../exceptions/SupplyChainException';
import { CommonUtils } from '../../utils/CommonUtils';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';


export default function ManufacturerAuthenticationHandler(app: express.Application) {

    async function registerManufacturer(req: express.Request, res: express.Response) {
        let supplyChainResponse: SupplyChainResponse = null;
        const dbconfig: DatabaseConfiguration = new DatabaseConfiguration();
        const dbConn: Connection = await dbconfig.getMySqlConnection(CompanyType.MANUFACTURER);
        try {
            dbConn.connect();
            
            if(!req.body) {
                supplyChainResponse = new SupplyChainResponse(422, 'Cannot process empty request body');
                return res.status(422).send(supplyChainResponse);
            }

            const orgDetails: VirtualOrganization = new VirtualOrganization(req.body);
            if(!orgDetails || !orgDetails.$virtualOrganization || !orgDetails.$superOrg) {
                supplyChainResponse = new SupplyChainResponse(422, 'Incomplete registration information recieved.');
                return res.status(422).send(supplyChainResponse);
            }
            if(orgDetails.$superOrg !== CompanyType.MANUFACTURER) {
                supplyChainResponse = new SupplyChainResponse(422, 'Cannot process registration of non-manufacturers org.');
                return res.status(422).send(supplyChainResponse);
            }

            dbConn.beginTransaction((transactionError) => {
                if(transactionError) {
                    supplyChainResponse = new SupplyChainResponse(500, 'Failed registering Manufacturer', null, transactionError);
                    return res.status(500).send(supplyChainResponse);
                }

                const affiliationName: string = 'providers.'.concat(orgDetails.$virtualOrganization);
                dbConn.query('SELECT * FROM ' + process.env.MANUFACTURER_MSP_SCHEMA + '.' + MSPDatabase.AFFILIATIONS + 'WHERE name = ?' + [affiliationName], (selectError, selectResults) => {
                    if(selectError) {
                        supplyChainResponse = new SupplyChainResponse(500, 'Failed registering manufacturer', null, selectError);
                        return res.status(500).send(supplyChainResponse);
                    }

                    if(selectResults && selectResults.length > 0) {
                        supplyChainResponse = new SupplyChainResponse(422, 'Manufacturer already registered');
                        return res.status(422).send(supplyChainResponse);
                    }

                    dbConn.query('INSERT INTO ' + process.env.MANUFACTURER_MSP_SCHEMA + '.' + MSPDatabase.AFFILIATIONS + '(name, prekey, level) VALUES (?, ?, ?)', [affiliationName, '', 1], (insertError) => {
                        if(!insertError) {
                            dbConn.rollback(() => {
                                supplyChainResponse = new SupplyChainResponse(500, 'Failed registering manufacturer', null, insertError);
                                return res.status(500).send(supplyChainResponse);
                            });
                        }

                        dbConn.commit((commitError) => {
                            if(commitError) {
                                dbConn.rollback(() => {
                                    supplyChainResponse = new SupplyChainResponse(500, 'Failed registering manufacturer', null, commitError);
                                    return res.status(500).send(supplyChainResponse);
                                });
                            }
                        });
                        supplyChainResponse = new SupplyChainResponse(200, 'Manufacturer registerd successfully');
                        return res.status(500).send(supplyChainResponse);
                    });
                });
            });
        } catch (error) {
            supplyChainResponse = new SupplyChainResponse(500, 'Failed registering manufacturer', null, error);
            return res.status(500).send(supplyChainResponse);
        } finally {
            dbConn.end();
        }
    }

    async function registerManufacturerUser(req: express.Request, res: express.Response) {
        
    }

    async function authenticateManufacturerUser(req: express.Request, res: express.Response) {
        let supplyChainResponse: SupplyChainResponse = null;
        let gateway: Gateway = new Gateway();
        let wallet = null;

        try {

            if(!req.body) {
                throw new SupplyChainException('Request Body is empty');
            }
            const user: User = new User(req.body);
            const connectionProfile = SupplyChainFileUtils.loadConnectionProfile(user.$organization);

            const walletPath = path.join(process.cwd(), SupplyChainFileUtils.getWalletFolder('Provider'));
            wallet = new FileSystemWallet(walletPath);

            const userExists = await wallet.exists(user.$name);
            if(userExists) {
                const token: any = await generateToken(gateway, connectionProfile, wallet, user);
                supplyChainResponse = new SupplyChainResponse(200, 'Authentication Successful', {token});
                return res.status(200).send(supplyChainResponse);
            }
            supplyChainResponse = new SupplyChainResponse(401, 'User with '+ user.$name + ' does not exists.');
            return res.status(supplyChainResponse.$status).send(supplyChainResponse);
        } catch (error) {
            supplyChainResponse =  new SupplyChainResponse(CommonUtils.getErrorStatus(error), error.$message);
            return res.status(CommonUtils.getErrorStatus(error)).send(supplyChainResponse);
        }
    }

    async function generateToken(gateway: Gateway, connectionProfile: any, wallet: FileSystemWallet, user: User) {
        return new Promise<any> (async (resolve, reject) => {
            // Set connection options; identity and wallet
            let connectionOptions = {
                wallet: wallet,
                identity: user.$name,
                discovery: { enabled: false, asLocalhost: true }
            };

            await gateway.connect(connectionProfile, connectionOptions);
            const ca = await gateway.getClient().getCertificateAuthority();
            const registeredUser = await gateway.getCurrentIdentity();

            if(registeredUser && registeredUser.isEnrolled()) {
                
                const signOptions = {
                    algorithm: 'HS256',
                    audidenec: process.env.JWT_AUDIENCE,
                    expiresIn: '1h'
                }

                try {
                    const token = await jwt.sign({
                        fabricOrg: user.$organization,
                        virtualOrganization: user.$virtualOrganization,
                        username: user.$name,
                    }, 
                    app.get('secret'), signOptions);
                    resolve(token);
                } catch(error) {
                    reject('Error while generating auth token');
                }
            }
            reject('User is not enrolled');
        });
    }

}