import { BadRequestException, Injectable } from "@nestjs/common";
import { parsePhoneNumber } from "libphonenumber-js/max";

@Injectable()
export class PhoneNumberValidation {
    validate(phoneNumber: string) {
        try {
            const parse = parsePhoneNumber(phoneNumber);
            if (parse.isValid())
                return {
                    phoneNumber: parse.formatInternational().replace(/\s+/g, "")
                };
        } catch (err) {
            throw new BadRequestException("Phone number is not valid")
        }
    }
}