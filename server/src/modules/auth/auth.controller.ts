import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { SignupUserDto } from "src/dtos/signupUser.dto";
import { v4 as uuid } from 'uuid';
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("local/signup")
    async signupLocal(@Body() dto: SignupUserDto) {
        const user = { id: uuid(), ...dto }
        const email = this.authService.signupLocal(user);
        return { email: email };
    }
}