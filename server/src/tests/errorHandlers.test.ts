import { ValidationChainError } from "@/util/customErrors.js";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { expressResponseMock } from "./util/expressResponseMock.js";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { ErrorDescription, MongoServerError } from "mongodb";

beforeEach(() => {
    vi.restoreAllMocks();
})

describe("genericRouteErrorHandler tests", () => {
    it("Handle a ValidationChainError", () => {
        genericRouteErrorHandler(new ValidationChainError([], "an error"), expressResponseMock);

        expect(expressResponseMock.status).toBeCalledWith(422);
        expect(expressResponseMock.json).toBeCalledWith({ message: "Validation Chain Error", errors: [] });
    });

    it("Handle a MongoServerErorr", () => {
        const errorDesc = { "message": "testing" } as ErrorDescription
        genericRouteErrorHandler(new MongoServerError(errorDesc), expressResponseMock);

        expect(expressResponseMock.status).toBeCalledWith(400);
        // FIXME: I can't seem to figure out how to mach the json that this error returns
        expect(expressResponseMock.json).toHaveBeenCalled();
    });

    it("Handle a generic error", () => {
        genericRouteErrorHandler(new Error("test error"), expressResponseMock);
        expect(expressResponseMock.status).toBeCalledWith(400);
        expect(expressResponseMock.json).toHaveBeenCalledWith({ error: "test error" });
    });

    it("Handle unexpected input", () => {
        genericRouteErrorHandler("asdf", expressResponseMock);
        expect(expressResponseMock.status).toBeCalledWith(400);
        expect(expressResponseMock.json).toHaveBeenCalledWith({ error: "expected parameter \"err\" to be an instance of error" });
    });
});