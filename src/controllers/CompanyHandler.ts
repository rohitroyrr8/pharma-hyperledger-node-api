import * as express from 'express';
import * as path from 'path';

export default function CompanyHandler(app: express.Application) {
    async function fetchUser(req: any, res: express.Response) {
        res.status(200).send('323');
    }

    app.get('/fetch-user', fetchUser);
}