import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignupCase } from "src/UseCases/AuthCases/SignupCase.service";
import { SigninCase } from "src/UseCases/AuthCases/signinCase.service";
import { VerificationCase } from "src/UseCases/AuthCases/VerificationCase.service";
import { SendVerificationCase } from "src/UseCases/AuthCases/SendVerificationCase.service";
import { ResetPasswordCase } from "src/UseCases/AuthCases/ResetPasswordCase.service";
import { SignoutCase } from "src/UseCases/AuthCases/SignoutCase.service";
import { RefreshTokenCase } from "src/UseCases/AuthCases/RefreshTokenCase.service";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService, SignupCase, SigninCase, 
        VerificationCase, SendVerificationCase, ResetPasswordCase,
        SignoutCase, RefreshTokenCase
    ]
})
export class AuthModule { }