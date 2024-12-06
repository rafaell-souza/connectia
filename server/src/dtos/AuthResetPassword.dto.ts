import { IsString, Length, Matches } from "class-validator";


export class AuthResetPasswordDto {
    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,12}$/)
    newPassword: string;
}