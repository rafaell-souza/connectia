import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignupCase } from "src/UseCases/SignupCase.service";
import { SigninCase } from "src/UseCases/signinCase.service";
import { VerificationCase } from "src/UseCases/VerificationCase.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, SignupCase, SigninCase, VerificationCase]
})
export class AuthModule { }