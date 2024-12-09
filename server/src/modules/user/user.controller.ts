import { Controller, Get, Put, Delete, Req, Body, UseGuards } from "@nestjs/common";
import { UserResetPasswordDto } from "src/dtos/UserResetPassword.dto";
import { ResetPasswordCase } from "src/UseCases/UserCases/ResetPassword.service";
import { GetUserCase } from "src/UseCases/UserCases/GetUserCase.service";
import { DeleteUserCase } from "src/UseCases/UserCases/DeleteUserCase.service";
import { BaseAuthGuard } from "src/Guards/BaseAuthGuard.guard";

@Controller("user")
@UseGuards(BaseAuthGuard)
export class UserController {
    constructor(
        private getUserCase: GetUserCase,
        private resetPasswordCase: ResetPasswordCase,
        private deleteUserCase: DeleteUserCase
    ) { }

    @Get()
    async getUser(@Req() req: any) {
        const userId = req.user.id;
        return await this.getUserCase.getUser(userId);
    }

    @Put("password-reset")
    async resetPassword(
        @Req() req: any,
        @Body() dto: UserResetPasswordDto
    ) {
        const userId = req.user.id;
        return await this.resetPasswordCase.reset(userId, dto)
    }

    @Delete()
    async deelteUser(@Req() req: any) {
        const userId = req.user.id;
        return await this.deleteUserCase.delete(userId);
    }
}