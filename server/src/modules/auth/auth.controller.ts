import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";
import { SignupUserDto } from "src/dtos/SignupUser";
import { v4 as uuid } from 'uuid';
import { AuthService } from "./auth.service";
import { format } from "date-fns";
import { SigninUserDto } from "src/dtos/SigninUser.dto";
import { Request, Response } from "express";

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
}