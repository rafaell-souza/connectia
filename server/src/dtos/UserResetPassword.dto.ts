import { IsString, Length, Matches } from "class-validator";


export class UserResetPasswordDto {
    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,12}$/)
    newPassword: string;

    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,12}$/)
    oldPassword: string;
}