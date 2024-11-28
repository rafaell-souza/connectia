import { BadRequestException } from "@nestjs/common";
import { PhoneNumberValidation } from "src/utils/phoneNumberValidation";

describe("check number formatation class", () => {
    let number: PhoneNumberValidation;

    beforeAll(() => {
        number = new PhoneNumberValidation();
    })

    it("should return a formated string", () => {
        const { phoneNumber } = number.validate("+55 (21) 99999-9999");

        expect(typeof phoneNumber).toBe("string");
    })

    it("should thorw an error", () => {
        expect(() => number.validate("123")).toThrow(BadRequestException)
    })
})