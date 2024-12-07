import { Injectable } from "@nestjs/common";
import { ISignupUser } from "src/interface/ISignupUser";
import { SignupCase } from "src/UseCases/authCases/SignupCase.service";
import { MailerService } from "src/utils/mailer/mailer.service";
import { ISigninUser } from "src/interface/ISigninUser";
import { SigninCase } from "src/UseCases/authCases/signinCase.service";
import { VerificationCase } from "src/UseCases/authCases/VerificationCase.service";
import { SignoutCase } from "src/UseCases/authCases/SignoutCase.service";
import { SendVerificationCase } from "src/UseCases/authCases/SendVerificationCase.service";
import { ResetPasswordCase } from "src/UseCases/authCases/ResetPasswordCase.service";
import { RefreshTokenCase } from "src/UseCases/authCases/RefreshTokenCase.service";

@Injectable()
export class AuthService {
    constructor(
        private mailer: MailerService,
        private signupCase: SignupCase,
        private signinCase: SigninCase,
        private verificationCase: VerificationCase,
        private signoutCase: SignoutCase,
        private sendVerificationCase: SendVerificationCase,
        private resetPasswordCase: ResetPasswordCase,
        private refreshTolenCase: RefreshTokenCase
    ) { }

    async signupLocal(data: ISignupUser) {
        const result = await this.signupCase.signupLocal(data);

        await this.mailer.send({
            name: `${result.firstName} ${result.lastName}`,
            email: result.email,
            subject: "Email verification",
            templateName: "verification-email",
            token: result.authCache.hashedVt // verification token
        })

        return {
            name: `${result.firstName} ${result.lastName}`,
            email: result.email,
            checked: result.checked
        };
    }

    async signinLocal(data: ISigninUser) {
        return await this.signinCase.signinLocal(data);
    }

    async verificationLocal(userId: string) {
        const result = await this.verificationCase.verificationLocal(userId);
        return {
            name: `${result.firstName} ${result.lastName}`,
            email: result.email,
            checked: result.checked
        }
    }

    async signout(userId: string) {
        return await this.signoutCase.signout(userId);
    }

    async sendVerification(email: string, template: string) {
        const result = await this.sendVerificationCase.send(email);
        await this.mailer.send({
            name: `${result.user.firstName} ${result.user.lastName}`,
            email: result.user.email,
            templateName: template,
            token: result.newVerificationToken,
            subject: "Email verification"
        })
    }

    async resetPassword(userId: string, newPassword: string) {
        return this.resetPasswordCase.reset(userId, newPassword);
    }

    async refreshToken(userId: string, email: string) {
        return await this.refreshTolenCase.refresh(userId, email);
    }
}