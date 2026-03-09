import { BackendServer } from "@util/BackendServer.js";
import { InfisicalWrapper } from "@util/infisical.js";

const infisical = new InfisicalWrapper();
await infisical.Setup();
const envVars = await infisical.GetVariables();

const server = new BackendServer(envVars);
await server.Setup();
await server.Run();

// export so server can be tested with supertest
export {
    server
}