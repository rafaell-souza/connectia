import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { SignupUserDto } from "src/dtos/signupUser.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("local/signup")
    async signupLocal(@Body() dto: SignupUserDto) {

    }
}