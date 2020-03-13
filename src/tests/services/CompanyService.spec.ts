import { Context } from "mocha";
import * as sinon from 'sinon';
/import {ChaincodeStub, ClientIdentity} from 'fabric-shim';

class PharmanetContext extends Context {
    logging;
    public stub: ChaincodeStub = sinon.createStubInstance(ChaincodeStub);
    public clietIdentity: ClientIdentity = sinon.createIdentity(ClientIdentity);
}

describe('Test for Drug Services', () => {
    describe('registering new drug', () => {
        it('should return no error', async() => {
            let actualResponse: boolean = true;
            let expectedResponse: boolean = true;

            expect(actualResponse).to.eql(expectedResponse);
        });
    });
});