import { expect, test } from "vitest"
import { MongoServerError } from "mongodb";
import { userCollection } from "@/util/db.js";
import * as exampleUsers from "@tests/util/example-users.js"

test("test user schema", async () => {

    const promise = userCollection.insertOne({ field: "value" });
    await expect(promise).rejects.toBeInstanceOf(MongoServerError);

});

test("insert user", async () => {
    var data = exampleUsers.user1;
    const result = await userCollection.insertOne(data as any);
    expect(result.acknowledged).toBe(true);
    expect(result.insertedId).toBe("1");
});

test("remove user", async () => {
    const result = await userCollection.deleteOne({ name: "John Doe" })
    expect(result.acknowledged).toBe(true);
    expect(result.deletedCount).toBe(1);
})