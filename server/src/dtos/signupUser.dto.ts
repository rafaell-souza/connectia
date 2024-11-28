import { IsEmail, IsString, Length, Matches } from "class-validator";


export class SignupUserDto {
    @IsString()
    @Length(3, 40)
    @Matches(/^([a-zA-Zà-úÀ-Ú]+(\s[a-zA-Zà-úÀ-Ú]+)*)$/)
    firstName: string;

    @IsString()
    @Length(3, 40)
    @Matches(/^([a-zA-Zà-úÀ-Ú]+(\s[a-zA-Zà-úÀ-Ú]+)*)$/)
    lastName: string;

    @IsString()
    @IsEmail()
    @Length(5, 50)
    email: string;

    @IsString()
    @Length(8, 12)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,12}$/)
    password: string;

    @IsString()
    @Length(8,20)
    phoneNumber: string;
}