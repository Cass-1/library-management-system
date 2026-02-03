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

describe("Integration Tests for User Route", () => {

    describe("userRoute GET requests", () => {
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

    describe("User Route POST Tests", () => {
        describe("Create Route Tests", () => {
            it("creates a user successfully");
            it("fails to create user because user already exists");
            it("fails to create user because of a malformed request");
        })

        describe("Delete Route Tests", () => {
            it("deletes a user successfully");
            it("fails to delete a user because user doesn't exist");
            it("fails to delete a user because of a malformed request");
        })

        describe("Update Route Tests", () => {
            it("updates a user successfully");
            it("fails to update a user because user doesn't exist");
            it("fails to update a user because of a malformed request");
        })

    })

});