import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import UserRepository from "./userRepository.js";
import { pool } from "../config/database.js";
describe("User Repository", () => {
    beforeEach(() => { });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it("should run query when findAll is called", () => {
        const spy = vi.spyOn(pool, "query");
        UserRepository.findAll();
        expect(spy).toHaveBeenCalledWith("SELECT * FROM users");
    });
});
