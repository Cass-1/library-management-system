import { InfisicalSDK } from '@infisical/sdk';

const setupClient = async () => {
    const infisicalSdk = new InfisicalSDK();
    await infisicalSdk.auth().universalAuth.login({
        clientId: process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_ID,
        clientSecret: process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_SECRET
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
    atlas_uri = (await infisicalClient.secrets().getSecret({
        projectId: process.env.INFISICAL_PROJECT_ID,
        environment: process.env.PROJECT_ENVIRONMENT,
        secretName: "ATLAS_URI"
    })).secretValue;

    database_name = (await infisicalClient.secrets().getSecret({
        projectId: process.env.INFISICAL_PROJECT_ID,
        environment: process.env.PROJECT_ENVIRONMENT,
        secretName: "DATABASE_NAME"
    })).secretValue;
} catch (e) {
    console.error(e);
}

export const ATLAS_URI = atlas_uri;
export const DATABASE_NAME = database_name;