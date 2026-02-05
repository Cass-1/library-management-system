import { vi } from "vitest";

const expressResponseMock: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
};

export {
    expressResponseMock
}