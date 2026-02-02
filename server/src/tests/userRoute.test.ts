import { describe } from "node:test";
import { afterAll, beforeAll, it, vi } from "vitest";

beforeAll(() => {
    // run dev database setup script
})

afterAll(() => {
    // cleanup
})

describe("userRoute GET requests", () => {
    it("gets a user successfully", () => {

    });
    it("fails to get a user because user doesn't exist");
    it("fails to get a user because of a malformed request");
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
