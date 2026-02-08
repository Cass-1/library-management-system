import { app } from "@/server.js";
import { userCollection } from "@/util/db.js";
import { describe } from "node:test";
import request from "supertest";
import { afterAll, beforeAll, expect, it } from "vitest";
import { GETExampleUser, POSTExampleUser, DELETEExampleUser, PATCHExampleUser } from "./util/userRoute-example-users.js";
import { ObjectId } from "mongodb";

describe("Integration Tests for User Route", async () => {

    describe("userRoute GET requests", async () => {
        // put a user in the database
        beforeAll(async () => {
            var data = GETExampleUser;
            const response = await userCollection.insertOne(data);
            expect(response.acknowledged).toBe(true);
            expect(response.insertedId).toBe(GETExampleUser._id);
        })
        // remove the user from the database
        afterAll(async () => {
            const response = await userCollection.deleteOne({ _id: GETExampleUser._id });
            expect(response.acknowledged).toBe(true);
            expect(response.deletedCount).toBe(1);
        })

        it("gets a user successfully", async () => {
            const res = await request(app).get(`/user/${GETExampleUser._id}`);
            console.log(GETExampleUser._id.toString())
            expect(res.statusCode).toBe(200);
            expect(GETExampleUser._id.equals(res.body._id));
        });
        it("fails to get a user because user doesn't exist", async () => {
            const id = new ObjectId();
            const res = await request(app).get(`/user/${id}`);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe(`User with id ${id} not found`);
        });
        it("fails to get a user because of a malformed request", async () => {
            const res = await request(app).get("/user/aa");
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("Validation Chain Error");
        });
    })

    describe("POST Route Tests", async () => {
        afterAll(async () => {
            const response = await userCollection.deleteOne({ _id: POSTExampleUser._id });
            expect(response.acknowledged).toBe(true);
            expect(response.deletedCount).toBe(1)
        })
        it("creates a user successfully", async () => {
            var data = POSTExampleUser;
            const res = await request(app).post("/user/").send(data);
            expect(res.statusCode).toBe(201);
            expect(res.body.acknowledged).toBe(true);
            expect(POSTExampleUser._id.equals(res.body.insertedId));
        });
        it("fails to create user because user already exists", async () => {
            var data = POSTExampleUser;
            const res = await request(app).post("/user/").send(data);
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("Mongodb Server Error");
        });
        it("fails to create user because of a malformed request", async () => {
            var data = { "utter": "nonsense" };
            const res = await request(app).post("/user").send(data);
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("Validation Chain Error");
        });
    })

    describe("DELETE Route Tests", async () => {
        beforeAll(async () => {
            var data = DELETEExampleUser;
            const response = await userCollection.insertOne(data);
            expect(response.acknowledged).toBe(true);
            expect(response.insertedId).toBe(DELETEExampleUser._id)
        })

        it("deletes a user successfully", async () => {
            const res = await request(app).delete(`/user/${DELETEExampleUser._id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.acknowledged).toBe(true);
            expect(res.body.deletedCount).toBe(1);
        });
        it("fails to delete a user because user doesn't exist", async () => {
            const res = await request(app).delete(`/user/${DELETEExampleUser._id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.acknowledged).toBe(true);
            expect(res.body.deletedCount).toBe(0);
        });
        it("fails to delete a user because of a malformed request", async () => {
            const res = await request(app).delete("/user/aa");
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("Validation Chain Error");
        });
    })

    describe("PATCH Route Tests", async () => {
        // put a user in the database
        beforeAll(async () => {
            var data = PATCHExampleUser;
            const response = await userCollection.insertOne(data);
            expect(response.acknowledged).toBe(true);
            expect(response.insertedId).toBe(PATCHExampleUser._id)
        })
        // remove the user from the database
        afterAll(async () => {
            const response = await userCollection.deleteOne({ _id: PATCHExampleUser._id });
            expect(response.acknowledged).toBe(true);
            expect(response.deletedCount).toBe(1)
        })

        it("updates a user successfully", async () => {
            const response = await request(app).patch(`/user/${PATCHExampleUser._id}`).send({ age: 1000 });
            const getResponse = await request(app).get(`/user/${PATCHExampleUser._id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.acknowledged).toBe(true);
            expect(response.body.modifiedCount).toBe(1);
            expect(response.body.upsertedCount).toBe(0);
            expect(response.body.matchedCount).toBe(1);
            expect(getResponse.body.age).toBe(1000);
        });
        it("fails to update a user because user doesn't exist", async () => {
            const id = new ObjectId()
            const response = await request(app).patch(`/user/${id}`).send({ age: 1000 })
            expect(response.statusCode).toBe(200);
            expect(response.body.acknowledged).toBe(true);
            expect(response.body.modifiedCount).toBe(0);
            expect(response.body.upsertedCount).toBe(0);
            expect(response.body.matchedCount).toBe(0);
            expect(response.body.upsertedId).toBe(null);
        });
        it("fails to update a user because of a malformed request", async () => {
            const response = await request(app).patch("/user/aaaaaa").send({ age: 1000 })
            expect(response.statusCode).toBe(422);
            expect(response.body.message).toBe("Validation Chain Error");
        });
    })


});