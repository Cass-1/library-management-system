import { ValidationChain } from "express-validator";
import { Middleware } from "express-validator/lib/base.js";
import { RunnableValidationChains } from "express-validator/lib/middlewares/schema.js";

// https://github.com/express-validator/express-validator/issues/718
export const testExpressValidator = async (req: Request, res: Response, middlewares: ValidationChain[]) => {
    await Promise.all(middlewares.map(async (middleware: Middleware) => {
        await middleware(req, res, () => undefined);
    }));
};

// example using createRequest() from node-mocks-http
// it("passes validation", async () => {
//     const mockReq = createRequest();
//     await testExpressValidator(mockReq as any, expressResponseMock, userController.validateGetUser());
//     const errors = validationResult(mockReq).array();

//     expect(errors).to.be.an('array');
//     expect(errors).to.not.be.empty;
// })