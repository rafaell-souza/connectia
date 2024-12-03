import { Hashservice } from "src/utils/hashing/hash.service"

describe("hashService", () => {
    let hashService: Hashservice;

    beforeAll(() => { hashService = new Hashservice(); })

    it("should return a hashed string", () => {
        const hash = hashService.hashData("123");
        expect(typeof hash).toBe("string");
    })

    it("should be compared successfully", () => {
        const hash = hashService.hashData("123");
        expect(hashService.compareData("123", hash)).toBeTruthy();
    })
})