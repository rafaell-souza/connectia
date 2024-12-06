import { Body, Controller, Get, HttpCode, Param, Post, Put, Req } from "@nestjs/common";
import { SignupUserDto } from "src/dtos/SignupUser";
import { v4 as uuid } from 'uuid';
import { AuthService } from "./auth.service";
import { format } from "date-fns";
import { SigninUserDto } from "src/dtos/SigninUser.dto";
import { Request, Response } from "express";
import { AuthResetPasswordDto } from "src/dtos/AuthResetPassword.dto";

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
        return { access_token: token }
    }

    @Put("local/verification")
    async verificationLocal(@Req() req: any) {
        const userId = req.user.id;
        const result = await this.authService.verificationLocal(userId);
        return {
            name: result.name,
            email: result.email,
            checked: result.checked
        }
    }

    @Post("signout")
    @HttpCode(204)
    async signout(@Req() req: any) {
        const userId = req.user.id;
        return await this.authService.signout(userId);
    }

    @Get("send_verification/:emplate")
    async sendVerification(
        @Body() req: Request,
        @Param("template") template: string
    ) {
        const email = req.body.email
        return await this.authService.sendVerification(email, template)
    }

    @Put("password-reset")
    async resetPassword(
        @Body() dto: AuthResetPasswordDto,
        @Req() req: any
    ) {
        const userId = req.user.id;
        return await this.authService.resetPassword(userId, dto.newPassword);
    }
}