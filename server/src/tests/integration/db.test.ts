import { expect, test } from "vitest"
import { MongoServerError } from "mongodb";
import { userCollection } from "@/util/db.js";

const user = {
    "_id": "1",
    "role": "member",
    "name": "John Doe",
    "age": 12.1,
    "enrollment_date": "2012-04-23T18:25:43.511Z",
    "fines": [
        {
            "total_cost": 10.1,
            "daily_rate": 1.1,
            "book_id": "1234"
        }
    ],
    "books": [
        {
            "book_id": "1234",
            "title": "A Very Interesting Book",
            "author": "George Greggory"
        }
    ],
    "email": "me@site.com"
}

test("test user schema", async () => {

    const promise = userCollection.insertOne({ field: "value" });
    await expect(promise).rejects.toBeInstanceOf(MongoServerError);

});

test("insert user", async () => {
    var data = user;
    const result = await userCollection.insertOne(data as any);
    expect(result.acknowledged).toBe(true);
    expect(result.insertedId).toBe("1");
});

test("remove user", async () => {
    const result = await userCollection.deleteOne({ name: "John Doe" })
    expect(result.acknowledged).toBe(true);
    expect(result.deletedCount).toBe(1);
})