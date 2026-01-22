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
export default infisicalClient;