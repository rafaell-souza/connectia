import { Module } from "@nestjs/common";
import { Global } from "@nestjs/common";
import { JwtService } from "./jwt.service";

@Global()
@Module({
    providers: [JwtService],
    exports: [JwtService]
})

export class JwtModule { }