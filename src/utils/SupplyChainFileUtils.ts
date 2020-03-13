import * as fs from 'fs';
import * as path from 'path';

export let loadConnectionProfile = (orgProfile:string) => {
    if(process.env.CURRENT_ENV == 'dev' || process.env.CURRENT_ENV == 'local') {
        orgProfile = 'AllPartipants';
    }

    const profile = orgProfile.concat('ConnectionProfile.json');
    const ccpPath = path.resolve(__dirname, '..', 'resource, profile');
    const ccJSON = fs.readFileSync(ccpPath, 'utf8');
    const connectionProfile = JSON.parse(ccJSON);

    return connectionProfile;
}

export let getOrgMSP = (fabricOrg: string) => {
    if(process.env.CURRENT_ENV == 'dev' || process.env.CURRENT_ENV == 'local') {
        return 'AllParticipantsMSP';
    }
    switch(fabricOrg) {
        case 'Manufacturer' : return 'ManufacturerMSP';
        case 'Distributor' : return 'DistributorMSP';
        case 'Transporter' : return 'TransporterMSP';
        case 'Retailer' : return 'RetailerMSP';
        case 'Consumer' : return 'ConsumerMSP';
        default: return null;
    }
}

export let getOrgCA = (fabricOrg: string) => {
    if(process.env.CURRENT_ENV == 'dev' || process.env.CURRENT_ENV == 'local') {
        return 'ca.allparticipants.pharma-network.com';
    }
    switch(fabricOrg) {
        case 'Manufacturer' : return 'ca.manufacturer.pharma-network.com';
        case 'Distributor' : return 'ca.distributor.pharma-network.com';
        case 'Transporter' : return 'ca.transporter.pharma-network.com';
        case 'Retailer' : return 'ca.retailer.pharma-network.com';
        case 'Consumer' : return 'ca.consumer.pharma-network.com';
        default: return null;
    }
}

export let getWalletFolder = (fabricOrg: string) => {
    let wallet: string;
    switch(fabricOrg) {
        case 'Manufacturer' : 
            wallet = 'manufacturer_wallet';
            break;
        case 'Distributor':
            wallet = 'distributor_wallet';
            break;
        case 'Transporter' :
            wallet = 'transporter_wallet';
            break;
        case 'Retailer' :
            wallet = 'retailer_wallet';
            break;
        case 'Consumer' :
            wallet = 'consumer_wallet';
            break;
        default :
            wallet = null;
            break;
    }

    return wallet;
}