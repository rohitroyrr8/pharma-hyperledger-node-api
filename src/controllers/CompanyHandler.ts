import * as express from 'express';
import * as path from 'path';
import { SupplyChainResponse } from '../models/SupplyChainResponse';
import * as log4js from 'log4js';

const contractHelper = require('../helpers/contractHelper');
const logger = log4js.getLogger('SupplyChain logs');

export default function CompanyHandler(app: express.Application) {

    async function registerCompany(req: any, res: express.Response) {
        let supplyChainResponse: SupplyChainResponse = null;
        try {
            if(!req.user) {
                supplyChainResponse = new SupplyChainResponse(401, 'User details not found.');
                return res.status(401).send(supplyChainResponse);
            }
            
            let contract = contractHelper.getContractInstance();
            const responseBuffer: Buffer = await contract.submitTransaction('registerCompany', JSON.stringify(req));
            const response: any = JSON.parse(responseBuffer.toString('utf-8'));

            return res.status(200).send(response);
            
        } catch (error) {
            return res.status(500).send('Something went wrong. Error: '+error);
        } finally {
            contractHelper.disconnect();
        }
    }

    async function fetchCompany(req: any, res: express.Response) {
        try {
            let contract = contractHelper.getContractInstance();
            const responseBuffer: Buffer = await contract.evaluateTransaction('fetchCompany', JSON.stringify(req));
            const response: any= JSON.parse(responseBuffer.toString('utf-8'));

            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send('Someting went wrong. Error: '+error);
        }
    }

    app.get('/get-company', fetchCompany);
    app.post('/register-company', registerCompany);
}