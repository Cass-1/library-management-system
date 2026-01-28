import { MongoClient } from "mongodb";
import { ATLAS_URI, DATABASE_NAME } from "../infisical.mjs"

const client = new MongoClient(ATLAS_URI);
let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db = conn.db(DATABASE_NAME);
export default db;