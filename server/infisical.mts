import { InfisicalSDK } from '@infisical/sdk';
import assert from 'assert';

const MACHINE_ID = process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_ID;
const MACHINE_SECRET = process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_SECRET;
const PROJECT_ID = process.env.INFISICAL_PROJECT_ID;
const PROJECT_ENVIRONMENT = process.env.PROJECT_ENVIRONMENT;

assert(MACHINE_ID !== undefined);
assert(MACHINE_SECRET !== undefined);
assert(PROJECT_ID !== undefined);
assert(PROJECT_ENVIRONMENT !== undefined);

const setupClient = async () => {
    const infisicalSdk = new InfisicalSDK();
    await infisicalSdk.auth().universalAuth.login({
        clientId: MACHINE_ID,
        clientSecret: MACHINE_SECRET
    });

    return infisicalSdk;
}

let infisicalClient;
try {
    infisicalClient = await setupClient();
} catch (e) {
    console.error(e);
}

let atlas_uri, database_name;
try {
    atlas_uri = (await infisicalClient?.secrets().getSecret({
        projectId: PROJECT_ID,
        environment: PROJECT_ENVIRONMENT,
        secretName: "ATLAS_URI"
    }))?.secretValue;

    database_name = (await infisicalClient?.secrets().getSecret({
        projectId: process.env.INFISICAL_PROJECT_ID ?? "",
        environment: process.env.PROJECT_ENVIRONMENT ?? "",
        secretName: "DATABASE_NAME"
    }))?.secretValue;
} catch (e) {
    console.error(e);
}

assert(atlas_uri !== undefined);
assert(database_name !== undefined);

export const ATLAS_URI = atlas_uri;
export const DATABASE_NAME = database_name;