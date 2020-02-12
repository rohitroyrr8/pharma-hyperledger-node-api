import * as express from 'express';
import CompanyHandler from './CompanyHandler';

export default function entryPoint(req: express.Application) {
    CompanyHandler(req);
}