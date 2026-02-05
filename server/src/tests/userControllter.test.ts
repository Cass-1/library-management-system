import * as userController from "@controllers/userController.js";
import { vi, beforeEach, describe, expect, it, Mock } from "vitest";
import { expressResponseMock } from "./util/expressResponseMock.js";

// https://github.com/vitest-dev/vitest/discussions/3589
const serviceMocks = vi.hoisted(() => {
    return {
        getUser: vi.fn(),
        deleteUser: vi.fn()
    }
});

vi.mock("../services/userService.js", () => {
    return {
        getUser: serviceMocks.getUser,
        deleteUser: serviceMocks.deleteUser
    }
})

describe("User Controller Unit Tests", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe("getUser tests", () => {
        it("get a user successfully", async () => {
            const mockReq = { params: { id: "1" } };
            (serviceMocks.getUser as Mock).mockResolvedValue({ test: "hello" });

            await userController.getUser(mockReq as any, expressResponseMock);

            expect(expressResponseMock.status).toHaveBeenCalledWith(200);
            expect(expressResponseMock.json).toHaveBeenCalledWith({ test: "hello" });
        });

        it("fail to get user because id not found", async () => {
            const mockReq = { params: { id: "1" } };
            (serviceMocks.getUser as Mock).mockResolvedValue(null);

            await userController.getUser(mockReq as any, expressResponseMock);

            expect(expressResponseMock.status).toHaveBeenCalledWith(400);
            expect(expressResponseMock.json).toHaveBeenCalledWith({ "error": "User with id 1 not found" });
        });

        it("fail to get user because of mongodb")
    })



    it("deleteUser should delete user", async () => {
        const mockReq = { params: { id: "1" } };
        (serviceMocks.deleteUser as Mock).mockResolvedValue({ test: "hello" });

        await userController.deleteUser(mockReq as any, expressResponseMock);

        expect(expressResponseMock.status).toHaveBeenCalledWith(200);
        expect(expressResponseMock.json).toHaveBeenCalledWith({ test: "hello" });
    })
})