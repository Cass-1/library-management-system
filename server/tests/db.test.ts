import { expect, test } from "vitest"
import { userCollection } from "../db/conn";
import { MongoServerError } from "mongodb";
import fs from 'fs';
import path from 'path';

test("test user schema", async () => {

    const promise = userCollection.insertOne({ field: "value" });
    await expect(promise).rejects.toBeInstanceOf(MongoServerError);

});

test("insert and remove user", async () => {
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./json-examples/user1.json")).toString());
    const promise = userCollection.insertOne(data);
    await expect(promise).resolves.toBeDefined();
});

test("remove user", async () => {
    const promise = userCollection.deleteOne({ name: "John Doe" })
    await expect(promise).resolves.toBeDefined();
})