import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignupCase } from "src/UseCases/SignupCase.service";
import { SigninCase } from "src/UseCases/signinCase.service";
import { VerificationCase } from "src/UseCases/VerificationCase.service";
import { SendVerificationCase } from "src/UseCases/SendVerificationCase.service";
import { ResetPasswordCase } from "src/UseCases/ResetPasswordCase.service";
import { SignoutCase } from "src/UseCases/SignoutCase.service";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService, SignupCase, SigninCase, 
        VerificationCase, SendVerificationCase, ResetPasswordCase,
        SignoutCase
    ]
})
export class AuthModule { }