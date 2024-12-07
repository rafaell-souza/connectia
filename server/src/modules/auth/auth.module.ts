import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignupCase } from "src/UseCases/authCases/SignupCase.service";
import { SigninCase } from "src/UseCases/authCases/signinCase.service";
import { VerificationCase } from "src/UseCases/authCases/VerificationCase.service";
import { SendVerificationCase } from "src/UseCases/authCases/SendVerificationCase.service";
import { ResetPasswordCase } from "src/UseCases/authCases/ResetPasswordCase.service";
import { SignoutCase } from "src/UseCases/authCases/SignoutCase.service";
import { RefreshTokenCase } from "src/UseCases/authCases/RefreshTokenCase.service";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService, SignupCase, SigninCase, 
        VerificationCase, SendVerificationCase, ResetPasswordCase,
        SignoutCase, RefreshTokenCase
    ]
})
export class AuthModule { }