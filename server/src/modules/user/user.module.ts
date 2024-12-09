import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { GetUserCase } from "src/UseCases/UserCases/GetUserCase.service";
import { DeleteUserCase } from "src/UseCases/UserCases/DeleteUserCase.service";
import { ResetPasswordCase } from "src/UseCases/UserCases/ResetPassword.service";

@Module({
    controllers: [UserController],
    providers: [GetUserCase, DeleteUserCase, ResetPasswordCase]
})

export class UserModule { }