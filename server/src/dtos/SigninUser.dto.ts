import { IsEmail, IsString, Length, Matches } from "class-validator";


export class SigninUserDto {
    @IsString()
    @IsEmail()
    @Length(5, 50)
    email: string;

    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,12}$/)
    password: string;
}