import { MongoClient } from "mongodb";
import infisicalClient from "../infisical.mjs"

const ATLAS_URI = (await infisicalClient.secrets().getSecret({
    projectId: process.env.INFISICAL_PROJECT_ID,
    environment: process.env.PROJECT_ENVIRONMENT,
    secretName: "ATLAS_URI"
})).secretValue;
const DATABASE_NAME = (await infisicalClient.secrets().getSecret({
    projectId: process.env.INFISICAL_PROJECT_ID,
    environment: process.env.PROJECT_ENVIRONMENT,
    secretName: "DATABASE_NAME"
})).secretValue;

const client = new MongoClient(ATLAS_URI);
let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db = conn.db(DATABASE_NAME);
export default db;