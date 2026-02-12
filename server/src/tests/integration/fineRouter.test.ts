import { app } from "@/server.js";
import { userCollection } from "@/util/db.js";
import { ObjectId } from "mongodb";
import request from "supertest"
import { describe, it, afterAll, beforeAll, afterEach, beforeEach, expect } from "vitest";
import { createExampleFine, deleteExampleFine, fineExampleUser, readExampleFine, updateExampleFine } from "@tests/util/fineRouterExamples.js";
describe("Fine CREATE", () => {
    afterAll(async () => {
        const response = await userCollection.deleteOne({ _id: fineExampleUser._id });
        expect(response.acknowledged).toBe(true);
        expect(response.deletedCount).toBe(1)
    })
    it("success", async () => {
        var data = createExampleFine;
        const res = await request(app).post("/fines/").send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body.acknowledged).toBe(true);
        expect(createExampleFine._id.equals(res.body.insertedId));
    })
    it("fail - fine already exists", async () => {
        var data = createExampleFine;
        const res = await request(app).post("/fines/").send(data);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Mongodb Server Error");
    })
    it("fail - malformed request", async () => {
        var data = { "utter": "nonsense" };
        const res = await request(app).post("/fines").send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})
describe("Fine READ", () => {
    beforeAll(async () => {
        var data = readExampleFine;
        const response = await userCollection.insertOne(data);
        expect(response.acknowledged).toBe(true);
        expect(response.insertedId).toBe(readExampleFine._id);
    })
    afterAll(async () => {
        const response = await userCollection.deleteOne({ _id: readExampleFine._id });
        expect(response.acknowledged).toBe(true);
        expect(response.deletedCount).toBe(1);
    })
    it("success", async () => {
        const res = await request(app).get(`/fines/${readExampleFine._id}`);
        console.log(readExampleFine._id.toString())
        expect(res.statusCode).toBe(200);
        expect(readExampleFine._id.equals(res.body._id));
    })
    it("fail - fine doesn't exist", async () => {
        const id = new ObjectId();
        const res = await request(app).get(`/fines/${id}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe(`Fine with id ${id} not found`);
    })
    it("fail - malformed request", async () => {
        const res = await request(app).get("/fines/aa");
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})
describe("Fine UPDATE", () => {
    beforeAll(async () => {
        var data = updateExampleFine;
        const response = await userCollection.insertOne(data);
        expect(response.acknowledged).toBe(true);
        expect(response.insertedId).toBe(updateExampleFine._id)
    })
    afterAll(async () => {
        const response = await userCollection.deleteOne({ _id: updateExampleFine._id });
        expect(response.acknowledged).toBe(true);
        expect(response.deletedCount).toBe(1)
    })
    it("success", async () => {
        const response = await request(app).patch(`/fines/${updateExampleFine._id}`).send({ author: "Hello World" });
        const getResponse = await request(app).get(`/fines/${updateExampleFine._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.acknowledged).toBe(true);
        expect(response.body.modifiedCount).toBe(1);
        expect(response.body.upsertedCount).toBe(0);
        expect(response.body.matchedCount).toBe(1);
        expect(getResponse.body.author).toBe("Hello World");
    })
    it("fail - fine doesn't exist", async () => {
        const id = new ObjectId()
        const response = await request(app).patch(`/fines/${id}`).send({ author: "Hello World" })
        expect(response.statusCode).toBe(200);
        expect(response.body.acknowledged).toBe(true);
        expect(response.body.modifiedCount).toBe(0);
        expect(response.body.upsertedCount).toBe(0);
        expect(response.body.matchedCount).toBe(0);
        expect(response.body.upsertedId).toBe(null);
    })
    it("fail - malformed request", async () => {
        const response = await request(app).patch("/fines/aaaaaa").send({ age: 1000 })
        expect(response.statusCode).toBe(422);
        expect(response.body.message).toBe("Validation Chain Error");
    })
})
describe("Fine DELETE", () => {
    beforeAll(async () => {
        var data = deleteExampleFine;
        const response = await userCollection.insertOne(data);
        expect(response.acknowledged).toBe(true);
        expect(response.insertedId).toBe(deleteExampleFine._id)
    })
    it("success", async () => {
        const res = await request(app).delete(`/fines/${deleteExampleFine._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.acknowledged).toBe(true);
        expect(res.body.deletedCount).toBe(1);
    })
    it("fail - fine doesn't exist", async () => {
        const res = await request(app).delete(`/fines/${deleteExampleFine._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.acknowledged).toBe(true);
        expect(res.body.deletedCount).toBe(0);
    })
    it("fail - malformed request", async () => {
        const res = await request(app).delete("/fines/aa");
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})