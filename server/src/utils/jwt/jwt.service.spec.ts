import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "src/utils/jwt/jwt.service";

describe("jwtService - methods", () => {
    let jwtService: JwtService;
    beforeAll(() => {
        jwtService = new JwtService();
    })

    it("should return a string as access token", () => {
        expect(typeof jwtService.createAccessToken("123", "example@gmail.com"))
            .toBe("string")
    })

    it("should return a string as refresh token", () => {
        expect(typeof jwtService.createRefreshToken("123"))
            .toBe("string")
    })

    it("should return a string as verification token", async () => {
        expect(typeof jwtService.createVerificationToken("123"))
            .toBe("string")
    })

    it("should return an object from token", () => {
        const token = jwtService.createAccessToken("123", "newemail@gmail.com")
        expect(jwtService.decodeToken(token)).toMatchObject({
            sub: expect.any(String),
            email: expect.any(String),
            createdAt: expect.any(String)
        })
    })

    it("should throw if invalid token", () => {
        const refresh = jwtService.createRefreshToken("1");
        expect(() => { jwtService.verifyToken(refresh, process.env.JWT_ACCESS_KEY) })
            .toThrow(UnauthorizedException)
    })

    it("should return an object from token", () => {
        const token = jwtService.createAccessToken("123", "email@gmail.com");
        expect(jwtService.verifyToken(token, process.env.JWT_ACCESS_KEY))
            .toMatchObject({
                sub: expect.any(String),
                email: expect.any(String),
                createdAt: expect.any(String)
            })
    })
})