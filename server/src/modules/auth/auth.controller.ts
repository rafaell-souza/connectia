import { Body, Controller, Get, HttpCode, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { SignupUserDto } from "src/dtos/SignupUser";
import { v4 as uuid } from 'uuid';
import { AuthService } from "./auth.service";
import { format } from "date-fns";
import { SigninUserDto } from "src/dtos/SigninUser.dto";
import { AuthResetPasswordDto } from "src/dtos/AuthResetPassword.dto";
import { BaseAuthGuard } from "src/Guards/BaseAuthGuard.guard";
import { VerificationGuard } from "src/Guards/VerificationGuard.guard";
import { RefreshTokenGuard } from "src/Guards/RefreshTokenGuard.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("local/signup")
    async signupLocal(@Body() dto: SignupUserDto) {
        const { name, checked } = await this.authService.signupLocal({
            id: uuid(),
            ...dto
        });

        const details = {
            name: name,
            checked: checked,
            createdAt: format(new Date(), "Pp")
        }
        return details;
    }

    @Post("local/signin")
    async signinLocal(@Body() dto: SigninUserDto) {
        const token = await this.authService.signinLocal(dto);
        return {
            access_token: token.access_token,
            refresh_token: token.refresh_token
        }
    }

    @Post("signout")
    @UseGuards(BaseAuthGuard)
    @HttpCode(204)
    async signout(@Req() req: any) {
        const userId = req.user.id;
        return await this.authService.signout(userId);
    }

    @Put("local/verification")
    @UseGuards(VerificationGuard)
    async verificationLocal(@Req() req: any) {
        const userId = req.user.id;
        const result = await this.authService.verificationLocal(userId);
        return {
            name: result.name,
            email: result.email,
            checked: result.checked
        }
    }

    @Get("send_verification/:email/:emplate")
    async sendVerification(
        @Param("template") template: string,
        @Param("email") email: string
    ) {
        return await this.authService.sendVerification(email, template)
    }

    @Put("password-reset")
    @UseGuards(VerificationGuard)
    async resetPassword(
        @Body() dto: AuthResetPasswordDto,
        @Req() req: any
    ) {
        const userId = req.user.id;
        return await this.authService.resetPassword(userId, dto.newPassword);
    }

    @Get("refresh-token")
    @UseGuards(RefreshTokenGuard)
    async refreshToken(@Body() req: any) {
        const { userId, email } = req.user
        const token = await this.authService.refreshToken(userId, email);
        return {
            access_token: token.access_token,
            refresh_token: token.refresh_token
        };
    }
}