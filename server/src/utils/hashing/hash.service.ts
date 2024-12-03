import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class Hashservice {
    hashData(data: any) {
        return bcrypt.hashSync(data, 10);
    }

    compareData(data: string, hashedData: string) {
        return bcrypt.compareSync(data, hashedData)
    }
}