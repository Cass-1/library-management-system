import { describe } from "node:test";
import request from "supertest";
import { afterAll, beforeAll, expect, it, vi } from "vitest";
import { app } from "@/server.js";
import { userCollection } from "@/util/db.js";
import path from "path";
import * as fs from "fs"
import { ObjectId } from "mongodb";

beforeAll(() => {
    // run dev database setup script
})

afterAll(() => {
    // cleanup
})

describe("Integration Tests for User Route", async () => {

    describe("userRoute GET requests", async () => {
        //TODO: improve both the beforeall and afterall here
        // put a user in the database
        beforeAll(async () => {
            var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./json-examples/user2.json")).toString());
            const response = await userCollection.insertOne(data);
            expect(response).toStrictEqual({ "acknowledged": true, "insertedId": "2" });
        })
        // remove the user from the database
        afterAll(async () => {
            const id = "2" as unknown as ObjectId;
            const response = await userCollection.deleteOne({ _id: id });
            expect(response).toStrictEqual({ "acknowledged": true, "deletedCount": 1 });
        })

        it("gets a user successfully", async () => {
            const res = await request(app).get("/user/2");
            expect(res.statusCode).toBe(200);
            expect(res.body._id).toBe("2");

        });
        it("fails to get a user because user doesn't exist", async () => {
            const res = await request(app).get("/user/3");
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("User with id 3 not found");
        });
        it("fails to get a user because of a malformed request", async () => {
            const res = await request(app).get("/user/aa");
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe("Validation Chain Error");
        });
    })

    describe("User Route POST Tests", async () => {
        describe("Create Route Tests", async () => {
            it("creates a user successfully", async () => {
                var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./json-examples/user3.json")).toString());
                const res = await request(app).post("/user/").send(data);
                expect(res.statusCode).toBe(201);
                expect(res.body.acknowledged).toBe(true);
                expect(res.body.insertedId).toBe("3");
            });
            it("fails to create user because user already exists", async () => {
                var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./json-examples/user3.json")).toString());
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
            it("deletes a user successfully", async () => {
                const res = await request(app).delete("/user/3");
                expect(res.statusCode).toBe(200);
                expect(res.body.acknowledged).toBe(true);
                expect(res.body.deletedCount).toBe(1);
            });
            it("fails to delete a user because user doesn't exist", async () => {
                const res = await request(app).delete("/user/3");
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

        describe("POST Route Tests", () => {
            //TODO: improve both the beforeall and afterall here
            // put a user in the database
            beforeAll(async () => {
                var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./json-examples/user4.json")).toString());
                const response = await userCollection.insertOne(data);
                expect(response).toStrictEqual({ "acknowledged": true, "insertedId": "4" });
            })
            // remove the user from the database
            afterAll(async () => {
                const id = "4" as unknown as ObjectId;
                const response = await userCollection.deleteOne({ _id: id });
                expect(response).toStrictEqual({ "acknowledged": true, "deletedCount": 1 });
            })

            it("updates a user successfully", async () => {
                const response = await request(app).patch("/user/4").send({ age: 1000 })
                expect(response.statusCode).toBe(200);
                expect(response.body.acknowledged).toBe(true);
                expect(response.body.modifiedCount).toBe(1);
                expect(response.body.upsertedCount).toBe(0);
                expect(response.body.matchedCount).toBe(1);
            });
            it("fails to update a user because user doesn't exist", async () => {
                const response = await request(app).patch("/user/1342").send({ age: 1000 })
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

    })

});