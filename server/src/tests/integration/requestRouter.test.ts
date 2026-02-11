import { describe, it, expect, afterAll, beforeAll, afterEach, beforeEach } from "vitest"
import request from "supertest";
import { app } from "@/server.js";
import { bookCollection } from "@/util/db.js";
import { ObjectId } from "mongodb";
import { requestExampleBook, createExampleRequest, readExampleRequest, deleteExampleRequest } from "@tests/util/requestRouterExamples.js";


beforeAll(async () => {
    await bookCollection.insertOne(requestExampleBook);
})
afterAll(async () => {
    await bookCollection.deleteOne({ _id: requestExampleBook._id });
})

// template for the above tests
describe("Request CREATE", () => {
    afterEach(async () => {
        await bookCollection.deleteOne({ _id: createExampleRequest._id });
    })
    it("success", async () => {
        var data = createExampleRequest;
        const res = await request(app).post(`/requests/${requestExampleBook._id}`).send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body.acknowledged).toBe(true);
        expect(createExampleRequest._id.equals(res.body.insertedId));
    })
    it("success - test scid", async () => {
        var data = createExampleRequest;
        console.log(requestExampleBook._id);
        const res = await request(app).post(`/requests/${requestExampleBook._id}/`).send(data);
        const getResponse = await request(app).get(`/requests/${requestExampleBook._id}/${createExampleRequest._id}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.acknowledged).toBe(true);
        expect(getResponse.body.scid).toBe(`${requestExampleBook._id}/${createExampleRequest._id}`);
    })
    it("fail - request already exists", async () => {
        var data = createExampleRequest;
        await request(app).post(`/requests/${requestExampleBook._id}/`).send(data);
        const res = await request(app).post(`/requests/${requestExampleBook._id}`).send(data);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Mongodb Server Error");
    })
    it("fail - malformed request", async () => {
        var data = { "utter": "nonsense" };
        const res = await request(app).post(`/requests/${requestExampleBook._id}`).send(data);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})
describe("Request READ", () => {
    beforeAll(async () => {
        await bookCollection.insertOne(readExampleRequest);
    })
    afterAll(async () => {
        await bookCollection.deleteOne({ _id: readExampleRequest._id });
    })
    it("success", async () => {
        const res = await request(app).get(`/requests/${requestExampleBook._id}/${readExampleRequest._id}`);
        console.log(requestExampleBook);
        console.log(readExampleRequest)
        expect(res.statusCode).toBe(200);
        expect(readExampleRequest._id.equals(res.body._id));
    })
    it("success - test scid", async () => {
        const res = await request(app).get(`/requests/${requestExampleBook._id}/${readExampleRequest._id}`);
        expect(res.statusCode).toBe(200);
        expect(readExampleRequest._id.equals(res.body._id));
        expect(res.body.scid).toBe(`${requestExampleBook._id}/${readExampleRequest._id}`);
    })
    it("fail - request doesn't exist", async () => {
        const id = new ObjectId();
        const res = await request(app).get(`/requests/${requestExampleBook._id}/${id}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe(`Request with id ${id} not found`);
    })
    it("fail - malformed request", async () => {
        const res = await request(app).get(`/requests/${requestExampleBook._id}/asdf`);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})

describe("Request DELETE", () => {
    beforeEach(async () => {
        await bookCollection.insertOne(deleteExampleRequest);
    })
    afterAll(async () => {
        await bookCollection.deleteOne({ _id: deleteExampleRequest._id });
    })
    it("success", async () => {
        const res = await request(app).delete(`/requests/${requestExampleBook._id}/${deleteExampleRequest._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.acknowledged).toBe(true);
        expect(res.body.deletedCount).toBe(1);
    })
    it("fail - request doesn't exist", async () => {
        await request(app).delete(`/requests/${requestExampleBook._id}/${deleteExampleRequest._id}`);
        const res = await request(app).delete(`/requests/${requestExampleBook._id}/${deleteExampleRequest._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.acknowledged).toBe(true);
        expect(res.body.deletedCount).toBe(0);
    })
    it("fail - malformed request", async () => {
        const res = await request(app).delete(`/requests/${requestExampleBook._id}/asdf`);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})


describe("get all requests for a specific book", () => {
    beforeAll(async () => {
        await bookCollection.insertOne(deleteExampleRequest);
        await bookCollection.insertOne(readExampleRequest);
        await bookCollection.insertOne(createExampleRequest);
    })
    afterAll(async () => {
        await bookCollection.deleteOne({ _id: deleteExampleRequest._id });
        await bookCollection.deleteOne({ _id: readExampleRequest._id });
        await bookCollection.deleteOne({ _id: createExampleRequest._id });
    })
    it("success", async () => {
        const res = await request(app).get(`/requests/${requestExampleBook._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(3);
        var idArray = [deleteExampleRequest._id.toString(), readExampleRequest._id.toString(), createExampleRequest._id.toString()]
        expect(idArray).toContain(res.body[0]._id);
        idArray = idArray.filter(x => x !== res.body[0]._id);
        expect(idArray).toContain(res.body[1]._id);
        idArray = idArray.filter(x => x !== res.body[1]._id);
        expect(idArray).toContain(res.body[2]._id);
    })
    it("success - book doesn't exist", async () => {
        const res = await request(app).get(`/requests/${new ObjectId()}`);
        expect(res.body).toStrictEqual([]);
    })
    it("fail - malformed request", async () => {
        const res = await request(app).get(`/requests/asdf`);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})

describe("delete all requests for a specific book", () => {
    beforeEach(async () => {
        await bookCollection.insertOne(deleteExampleRequest);
        await bookCollection.insertOne(readExampleRequest);
        await bookCollection.insertOne(createExampleRequest);
    })
    afterAll(async () => {
        await bookCollection.deleteOne({ _id: deleteExampleRequest._id });
        await bookCollection.deleteOne({ _id: readExampleRequest._id });
        await bookCollection.deleteOne({ _id: createExampleRequest._id });
    })
    it("success", async () => {
        const res = await request(app).delete(`/requests/${requestExampleBook._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.acknowledged).toBe(true);
        expect(res.body.deletedCount).toBe(3);
    })
    it("fail - request doesn't exist", async () => {
        await request(app).delete(`/requests/${requestExampleBook._id}`);
        const res = await request(app).delete(`/requests/${requestExampleBook._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.acknowledged).toBe(true);
        expect(res.body.deletedCount).toBe(0);
    })
    it("fail - malformed request", async () => {
        const res = await request(app).delete(`/requests/aaa`);
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Validation Chain Error");
    })
})