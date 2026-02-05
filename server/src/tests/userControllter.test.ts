import * as userController from "@controllers/userController.js";
import { vi, beforeEach, describe, expect, it } from "vitest";
import { expressResponseMock } from "./util/expressResponseMock.js";
import * as UserService from "@services/userService.js"
import { User } from "@/models/User.js";

// vi.mock("../services/userService.ts", async () => {
//     const originalModule = await vi.importActual("../services/userService.ts");

//     return {
//         ...originalModule,
//         getUser: async () => vi.fn(),
//         deleteUser: async () => vi.fn()
//     }
// });

describe("User Controller Unit Tests", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("getUser should get a user", async () => {
        const spy = vi.spyOn(UserService, "getUser").mockResolvedValue({ test: "hello" } as any as User)
        const mockReq = { params: { id: "1" } };

        await userController.getUser(mockReq as any, expressResponseMock);

        expect(spy).toHaveBeenCalled();
        expect(expressResponseMock.status).toHaveBeenCalledWith(200);
        expect(expressResponseMock.json).toHaveBeenCalledWith({ test: "hello" } as any as User);
    });

    it("deleteUser should delete user", async () => {
        const spy = vi.spyOn(UserService, "deleteUser").mockResolvedValue({ test: "hello" } as any);
        const mockReq = { params: { id: "1" } };

        await userController.deleteUser(mockReq as any, expressResponseMock);

        expect(spy).toHaveBeenCalled();
        expect(expressResponseMock.status).toHaveBeenCalledWith(200);
        expect(expressResponseMock.json).toHaveBeenCalledWith({ test: "hello" } as any);
    })
})