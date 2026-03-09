import { InfisicalSDK } from '@infisical/sdk';

interface InfisicalSecrets {
    MACHINE_ID: string;
    MACHINE_SECRET: string;
    PROJECT_ID: string;
    PROJECT_ENVIRONMENT: string;
}

export interface EnvironmentVariables {
    ATLAS_URI?: string;
    DATABASE_NAME?: string;
    PORT?: string;
}

export class InfisicalWrapper {
    private infisicalClient?: InfisicalSDK;
    private infisicalSecrets: InfisicalSecrets;
    constructor() {
        this.infisicalSecrets = {
            MACHINE_ID: process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_ID ?? "",
            MACHINE_SECRET: process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_SECRET ?? "",
            PROJECT_ID: process.env.INFISICAL_PROJECT_ID ?? "",
            PROJECT_ENVIRONMENT: process.env.PROJECT_ENVIRONMENT ?? ""
        }
    }
    Setup = async () => {
        try {
            this.infisicalClient = await this.setupClient();


        } catch (e) {
            console.error(e);
        }
    }

    GetVariables = async (): Promise<EnvironmentVariables> => {
        var environmentVariables: EnvironmentVariables = {
            ATLAS_URI: undefined,
            DATABASE_NAME: undefined,
            PORT: undefined,
        }
        try {
            const atlas_uri = (await this.infisicalClient?.secrets().getSecret({
                projectId: this.infisicalSecrets.PROJECT_ID,
                environment: this.infisicalSecrets.PROJECT_ENVIRONMENT,
                secretName: "ATLAS_URI"
            }))?.secretValue;

            const database_name = (await this.infisicalClient?.secrets().getSecret({
                projectId: this.infisicalSecrets.PROJECT_ID,
                environment: this.infisicalSecrets.PROJECT_ENVIRONMENT,
                secretName: "DATABASE_NAME"
            }))?.secretValue;

            const port = (await this.infisicalClient?.secrets().getSecret({
                projectId: this.infisicalSecrets.PROJECT_ID,
                environment: this.infisicalSecrets.PROJECT_ENVIRONMENT,
                secretName: "PORT"
            }))?.secretValue;
            environmentVariables.ATLAS_URI = atlas_uri;
            environmentVariables.DATABASE_NAME = database_name;
            environmentVariables.PORT = port;
        }
        catch (e) {
            console.log(e);
        }
        return environmentVariables;
    }

    private setupClient = async () => {
        const infisicalSdk = new InfisicalSDK();
        await infisicalSdk.auth().universalAuth.login({
            clientId: this.infisicalSecrets.MACHINE_ID,
            clientSecret: this.infisicalSecrets.MACHINE_SECRET
        });

        return infisicalSdk;
    }
}