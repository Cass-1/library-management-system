import { EnvironmentVariables, InfisicalWrapper } from "@/util/InfisicalWrapper.js";
import { vi, beforeEach, describe, it, expect, test, afterAll, beforeAll } from "vitest";

describe("Test proper failure", () => {
    const environment = process.env;

    beforeEach(() => {
        vi.resetModules();
        process.env = { ...environment };
    });

    afterAll(() => {
        vi.resetModules();
        process.env = { ...environment };
    })
    test("failure due to missing Machine Id environment variable", async () => {
        delete process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_ID;

        let infisical, variables, error;
        try {
            infisical = new InfisicalWrapper();
            await infisical.Setup();
            variables = await infisical.GetVariables();
        }
        catch (e) {
            error = e;
        }
        finally {
            // expect InfisicalWrapper to handle its error
            expect(error).toBeUndefined();

            expect(variables?.ATLAS_URI).toBeUndefined();
            expect(variables?.DATABASE_NAME).toBeUndefined();
            expect(variables?.PORT).toBeUndefined();
        }
    });

    test("failure due to missing Client Secret environment variable", async () => {
        delete process.env.INFISICAL_MACHINE_IDENTITY_CLIENT_SECRET;

        let infisical, variables, error;
        try {
            infisical = new InfisicalWrapper();
            await infisical.Setup();
            variables = await infisical.GetVariables();
        }
        catch (e) {
            error = e;
        }
        finally {
            // expect InfisicalWrapper to handle its error
            expect(error).toBeUndefined();

            expect(variables?.ATLAS_URI).toBeUndefined();
            expect(variables?.DATABASE_NAME).toBeUndefined();
            expect(variables?.PORT).toBeUndefined();
        }
    })

    test("failure due to missing Project Id environment variable", async () => {
        delete process.env.INFISICAL_PROJECT_ID;

        let infisical, variables, error;
        try {
            infisical = new InfisicalWrapper();
            await infisical.Setup();
            variables = await infisical.GetVariables();
        }
        catch (e) {
            error = e;
        }
        finally {
            // expect InfisicalWrapper to handle its error
            expect(error).toBeUndefined();

            expect(variables?.ATLAS_URI).toBeUndefined();
            expect(variables?.DATABASE_NAME).toBeUndefined();
            expect(variables?.PORT).toBeUndefined();
        }
    });

    test("failure due to missing Project Environment environment variable", async () => {
        delete process.env.PROJECT_ENVIRONMENT;

        let infisical, variables, error;
        try {
            infisical = new InfisicalWrapper();
            await infisical.Setup();
            variables = await infisical.GetVariables();
        }
        catch (e) {
            error = e;
        }
        finally {
            // expect InfisicalWrapper to handle its error
            expect(error).toBeUndefined();

            expect(variables?.ATLAS_URI).toBeUndefined();
            expect(variables?.DATABASE_NAME).toBeUndefined();
            expect(variables?.PORT).toBeUndefined();
        }
    });
});

describe("test successful behavior", () => {
    test("proper retrieval of infisical secrets", async () => {
        const infisical = new InfisicalWrapper();
        await infisical.Setup();
        const port = (await infisical.GetVariables()).PORT;
        expect(port).toBe("3000");
    })
});