import { it, describe, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import { app } from "@/server.js";
import { ObjectId } from "mongodb";
import { bookCollection } from "@/util/db.js";
import { createExampleBook, readExampleBook, updateExampleBook, deleteExampleBook } from "./util/bookRouterExamples.js";


describe("bookRouter functional tests", () => {
    describe("Book CREATE", () => {
        afterAll(async () => {
            const response = await bookCollection.deleteOne({ _id: createExampleBook._id });
            expect(response.acknowledged).toBe(true);
            expect(response.deletedCount).toBe(1)
        })
        it("success", async () => {
            var data = createExampleBook;
            const res = await request(app).post("/books/").send(data);
            expect(res.statusCode).toBe(201);
            expect(res.body.acknowledged).toBe(true);
            expect(createExampleBook._id.equals(res.body.insertedId));
        })
        it("fail - book already exists", async () => {
            var data = createExampleBook;
            const res = await request(app).post("/books/").send(data);
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("Mongodb Server Error");
        })
        it("fail - malformed request", async () => {
            var data = { "utter": "nonsense" };
            const res = await request(app).post("/books").send(data);
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("Validation Chain Error");
        })
    })
    describe("Book READ", () => {
        beforeAll(async () => {
            var data = readExampleBook;
            const response = await bookCollection.insertOne(data);
            expect(response.acknowledged).toBe(true);
            expect(response.insertedId).toBe(readExampleBook._id);
        })
        afterAll(async () => {
            const response = await bookCollection.deleteOne({ _id: readExampleBook._id });
            expect(response.acknowledged).toBe(true);
            expect(response.deletedCount).toBe(1);
        })
        it("success", async () => {
            const res = await request(app).get(`/books/${readExampleBook._id}`);
            console.log(readExampleBook._id.toString())
            expect(res.statusCode).toBe(200);
            expect(readExampleBook._id.equals(res.body._id));
        })
        it("fail - book doesn't exist", async () => {
            const id = new ObjectId();
            const res = await request(app).get(`/books/${id}`);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe(`Book with id ${id} not found`);
        })
        it("fail - malformed request", async () => {
            const res = await request(app).get("/books/aa");
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("Validation Chain Error");
        })
    })
    describe("Book UPDATE", () => {
        beforeAll(async () => {
            var data = updateExampleBook;
            const response = await bookCollection.insertOne(data);
            expect(response.acknowledged).toBe(true);
            expect(response.insertedId).toBe(updateExampleBook._id)
        })
        afterAll(async () => {
            const response = await bookCollection.deleteOne({ _id: updateExampleBook._id });
            expect(response.acknowledged).toBe(true);
            expect(response.deletedCount).toBe(1)
        })
        it("success", async () => {
            const response = await request(app).patch(`/books/${updateExampleBook._id}`).send({ author: "Hello World" });
            const getResponse = await request(app).get(`/books/${updateExampleBook._id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.acknowledged).toBe(true);
            expect(response.body.modifiedCount).toBe(1);
            expect(response.body.upsertedCount).toBe(0);
            expect(response.body.matchedCount).toBe(1);
            expect(getResponse.body.author).toBe("Hello World");
        })
        it("fail - book doesn't exist", async () => {
            const id = new ObjectId()
            const response = await request(app).patch(`/books/${id}`).send({ author: "Hello World" })
            expect(response.statusCode).toBe(200);
            expect(response.body.acknowledged).toBe(true);
            expect(response.body.modifiedCount).toBe(0);
            expect(response.body.upsertedCount).toBe(0);
            expect(response.body.matchedCount).toBe(0);
            expect(response.body.upsertedId).toBe(null);
        })
        it("fail - malformed request", async () => {
            const response = await request(app).patch("/books/aaaaaa").send({ age: 1000 })
            expect(response.statusCode).toBe(422);
            expect(response.body.message).toBe("Validation Chain Error");
        })
    })
    describe("Book DELETE", () => {
        beforeAll(async () => {
            var data = deleteExampleBook;
            const response = await bookCollection.insertOne(data);
            expect(response.acknowledged).toBe(true);
            expect(response.insertedId).toBe(deleteExampleBook._id)
        })
        it("success", async () => {
            const res = await request(app).delete(`/books/${deleteExampleBook._id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.acknowledged).toBe(true);
            expect(res.body.deletedCount).toBe(1);
        })
        it("fail - book doesn't exist", async () => {
            const res = await request(app).delete(`/books/${deleteExampleBook._id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.acknowledged).toBe(true);
            expect(res.body.deletedCount).toBe(0);
        })
        it("fail - malformed request", async () => {
            const res = await request(app).delete("/books/aa");
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("Validation Chain Error");
        })
    })
})