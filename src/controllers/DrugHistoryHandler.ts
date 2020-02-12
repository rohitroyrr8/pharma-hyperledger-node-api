import * as express from 'express';
import * as path from 'path';
import { SupplyChainResponse } from '../models/SupplyChainResponse';
import * as log4js from 'log4js';

const contractHelper = require('../helpers/contractHelper');
const logger = log4js.getLogger('SupplyChain logs');

export default function DrugHistoryHandler(app: express.Application) {
    async function viewHistory(req: any, res: express.Response) {
        try {
            let contract = contractHelper.getContractInstance();
            const responseBuffer: Buffer = await contract.evaluateTransaction('viewHistory', JSON.stringify(req));
            const response: any = JSON.parse(responseBuffer.toString('utf-8'));

            return res.status(200).send(response);
            
        } catch (error) {
            return res.status(500).send('Something went wrong. Error: '+error);
        } finally {
            contractHelper.disconnect();
        }
    }

    app.get('/view-drug-history', viewHistory);
}