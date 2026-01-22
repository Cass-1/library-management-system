const express = require('express')
const { InfisicalSDK } = require('@infisical/sdk')
const app = express()
const port = 3000

const setupClient = async () => {
    const infisicalSdk = new InfisicalSDK();
    await infisicalSdk.auth().universalAuth.login({
        clientId: process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_ID,
        clientSecret: process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_SECRET
    });

    return infisicalSdk;
}
let infisicalClient;
(async () => {
    try {
        infisicalClient = await setupClient();
    }
    catch (err) {
        console.log(err);
    }
    console.log("success in getting infisical client");
})();


app.get("/", async (req, res) => {

    const allSecrets = await infisicalClient.secrets().listSecrets({
        environment: process.env.INFISICAL_PROJECT_ENVIRONMENT,
        projectId: process.env.INFISICAL_PROJECT_ID
    });

    res.send(`Hello! My name is: ` + JSON.stringify(allSecrets));
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})