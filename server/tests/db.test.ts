import { assert, expect, test } from "vitest"
import { mongoDB, userCollection } from "../db/conn.mts";
import { MongoServerError, InsertOneResult, ObjectId } from "mongodb";
import { readFileSync } from "node:fs"
import path from "node:path";

test("test user schema", async () => {

    const promise = userCollection.insertOne({ field: "value" });
    await expect(promise).rejects.toBeInstanceOf(MongoServerError);

});

test("insert and remove user", async () => {
    var data = JSON.parse(readFileSync(path.join(__dirname, "./json-examples/user1.json")).toString());
    const promise = userCollection.insertOne(data);
    await expect(promise).resolves.toBeDefined();
});

test("remove user", async () => {
    const promise = userCollection.deleteOne({ name: "John Doe" })
    await expect(promise).resolves.toBeDefined();
})