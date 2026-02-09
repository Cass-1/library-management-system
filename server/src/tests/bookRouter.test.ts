import { it, describe, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import { app } from "@/server.js";
import { ObjectId } from "mongodb";
import { bookCollection } from "@/util/db.js";
import { createExampleBook, readExampleBook, updateExampleBook, deleteExampleBook } from "./util/bookRouteExamples.js";


describe("bookRouter functional tests", () => {
    describe("bookRouter CRUD routes", () => {
        describe("book CRUD routes", () => {
            describe("CREATE", () => {
                afterAll(async () => {
                    const response = await bookCollection.deleteOne({ _id: createExampleUser._id });
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
            describe("READ", () => {
                // put a user in the database
                beforeAll(async () => {
                    var data = readExampleUser;
                    const response = await bookCollection.insertOne(data);
                    expect(response.acknowledged).toBe(true);
                    expect(response.insertedId).toBe(readExampleUser._id);
                })
                // remove the user from the database
                afterAll(async () => {
                    const response = await bookCollection.deleteOne({ _id: readExampleUser._id });
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
            describe("UPDATE", () => {
                // put a user in the database
                beforeAll(async () => {
                    var data = updateExampleBook;
                    const response = await bookCollection.insertOne(data);
                    expect(response.acknowledged).toBe(true);
                    expect(response.insertedId).toBe(updateExampleBook._id)
                })
                // remove the user from the database
                afterAll(async () => {
                    const response = await bookCollection.deleteOne({ _id: updateExampleBook._id });
                    expect(response.acknowledged).toBe(true);
                    expect(response.deletedCount).toBe(1)
                })
                it("success", async () => {
                    var data = updateExampleBook;
                    const res = await request(app).post("/books/").send(data);
                    expect(res.statusCode).toBe(201);
                    expect(res.body.acknowledged).toBe(true);
                    expect(updateExampleBook._id.equals(res.body.insertedId));
                })
                it("fail - book doesn't exist", async () => {
                    var data = updateExampleBook;
                    const res = await request(app).post("/books/").send(data);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.message).toBe("Mongodb Server Error");
                })
                it("fail - malformed request", async () => {
                    var data = { "utter": "nonsense" };
                    const res = await request(app).post("/books/").send(data);
                    expect(res.statusCode).toBe(422);
                    expect(res.body.message).toBe("Validation Chain Error");
                })
            })
            describe("DELETE", () => {
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
        describe("request CRUD routes", () => {
            describe("CREATE", () => {
                it("success")
                it("fail - request already exists")
                it("fail - malformed request")
            })
            describe("READ", () => {
                it("success")
                it("fail - request doesn't exist")
                it("fail - malformed request")
            })
            describe("UPDATE", () => {
                it("success")
                it("fail - request doesn't exist")
                it("fail - malformed request")
            })
            describe("DELETE", () => {
                it("success")
                it("fail - request doesn't exist")
                it("fail - malformed request")
            })
        })
    })
    //TODO: finish writing testing outline 
    describe("bookRouter other routes", () => {
        describe("request book", () => {
            it("book is available")
            it("book has waitline")
            describe("user can't checkout", () => {
                it("fail - user has overdue books")
                it("fail - user has max amount of books")
            })
        })
    })
})