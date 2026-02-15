import { describe, it, expect, afterAll, beforeAll, afterEach, beforeEach } from "vitest"
import fine from "supertest";
import { app } from "@/server.js";
import { userCollection } from "@/util/db.js";
import { ObjectId } from "mongodb";
import { Fine } from "@/models/Fine.js";
import { User, UserRole } from "@/models/User.js";

export const exampleFine: Fine = {
    "daily_rate": 1.1,
    "book_id": new ObjectId(),
    "_id": new ObjectId(),
    "dateIssued": new Date()
}

export const getExampleFine: Fine = {
    "daily_rate": 1.1,
    "book_id": new ObjectId(),
    "_id": new ObjectId(),
    "dateIssued": new Date()
}

export const deleteExampleFine: Fine = {
    "daily_rate": 1.1,
    "book_id": new ObjectId(),
    "_id": new ObjectId(),
    "dateIssued": new Date()
}

export const exampleUser: User = {
    "_id": new ObjectId(),
    "role": UserRole.Member,
    "name": "Fine Example User",
    "age": 12.1,
    "enrollment_date": new Date(),
    "fines": [getExampleFine, deleteExampleFine],
    "books": [
        {
            "book_id": "1234",
            "title": "A Very Interesting Book",
            "author": "George Greggory"
        }
    ],
    "email": "me@site.com"
}

beforeAll(async () => {
    await userCollection.insertOne(exampleUser);
})

afterAll(async () => {
    await userCollection.deleteOne({ _id: exampleUser._id });
})


// template for the above tests
describe("Fine CREATE", () => {
    it("success", async () => {
        var data = exampleFine;
        const res = await fine(app).post(`/fines/${exampleUser._id}`).send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body.acknowledged).toBe(true);
        expect(exampleFine._id.equals(res.body.insertedId));
    })
    it("fail - fine already exists", async () => {
        var data = exampleFine;
        await fine(app).post(`/fines/${exampleUser._id}/`).send(data);
        const res = await fine(app).post(`/fines/${exampleUser._id}`).send(data);
        expect(res.statusCode).toBe(400);
    })
    it("fail - malformed fine", async () => {
        var data = { "utter": "nonsense" };
        const res = await fine(app).post(`/fines/${exampleUser._id}`).send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})
describe("Fine READ", () => {
    it("success", async () => {
        const res = await fine(app).get(`/fines/${exampleUser._id}/${getExampleFine._id}`);
        expect(res.statusCode).toBe(200);
        expect(exampleFine._id.equals(res.body._id));
    })
    it("success - fine doesn't exist", async () => {
        const id = new ObjectId();
        const res = await fine(app).get(`/fines/${exampleUser._id}/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe("");
    })
    it("fail - malformed fine", async () => {
        const res = await fine(app).get(`/fines/${exampleUser._id}/asdf`);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})

describe("Fine DELETE", () => {
    it("success", async () => {
        const res = await fine(app).delete(`/fines/${exampleUser._id}/${deleteExampleFine._id}`);
        const getRes = await fine(app).get(`/fines/${exampleUser._id}/${deleteExampleFine._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.acknowledged).toBe(true);
        expect(res.body.deletedCount).toBe(1);
        expect(getRes.body).toBe("");
    })
    it("fine doesn't exist", async () => {
        await fine(app).delete(`/fines/${exampleUser._id}/${deleteExampleFine._id}`);
        const res = await fine(app).delete(`/fines/${exampleUser._id}/${deleteExampleFine._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.acknowledged).toBe(true);
    })
    it("fail - malformed fine", async () => {
        const res = await fine(app).delete(`/fines/${exampleUser._id}/asdf`);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})


describe("get all fines for a specific user", () => {
    beforeAll(async () => {
        await userCollection.deleteOne({ _id: exampleUser._id });
        await userCollection.insertOne(exampleUser);
    })
    afterAll(async () => {
        await userCollection.deleteOne({ _id: exampleUser._id });
    })
    it("success", async () => {
        const res = await fine(app).get(`/fines/${exampleUser._id}`);
        const fines: Fine[] = res.body.fines;
        expect(res.statusCode).toBe(200);
        expect(fines).toHaveLength(2);
        var idArray = [getExampleFine._id.toString(), deleteExampleFine._id.toString()]
        expect(idArray).toContain(fines[0]._id);
        idArray = idArray.filter(x => x !== fines[0]._id);
        expect(idArray).toContain(fines[1]._id);
    })
    it("success - user doesn't exist", async () => {
        const res = await fine(app).get(`/fines/${new ObjectId()}`);
        expect(res.body).toStrictEqual({});
    })
    it("fail - malformed fine", async () => {
        const res = await fine(app).get(`/fines/asdf`);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})
