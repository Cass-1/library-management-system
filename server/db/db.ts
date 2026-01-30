import { Db, MongoClient } from "mongodb";
import { ATLAS_URI, DATABASE_NAME } from "../infisical.js";
import { strict as assert } from 'node:assert';

// https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial
const client = new MongoClient(ATLAS_URI);
let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db: Db | undefined = conn?.db(DATABASE_NAME);
let userCol = db?.collection("users");

assert(db !== undefined);
assert(userCol !== undefined);

export const mongoDB = db;
export const userCollection = userCol;