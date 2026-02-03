import { expect, test } from "vitest"
import { MongoServerError } from "mongodb";
import fs from 'fs';
import path from 'path';
import { userCollection } from "@/util/db.js";

test("test user schema", async () => {

    const promise = userCollection.insertOne({ field: "value" });
    await expect(promise).rejects.toBeInstanceOf(MongoServerError);

});

test("insert user", async () => {
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./json-examples/user1.json")).toString());
    const result = await userCollection.insertOne(data);
    expect(result).toStrictEqual({ "acknowledged": true, "insertedId": "1" });
});

test("remove user", async () => {
    const result = await userCollection.deleteOne({ name: "John Doe" })
    expect(result).toStrictEqual({ "acknowledged": true, "deletedCount": 1 });
})