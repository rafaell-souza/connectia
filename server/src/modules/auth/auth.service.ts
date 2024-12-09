import { Injectable } from "@nestjs/common";
import { ISignupUser } from "src/interface/ISignupUser";
import { SignupCase } from "src/UseCases/AuthCases/SignupCase.service";
import { MailerService } from "src/utils/mailer/mailer.service";
import { ISigninUser } from "src/interface/ISigninUser";
import { SigninCase } from "src/UseCases/AuthCases/signinCase.service";
import { VerificationCase } from "src/UseCases/AuthCases/VerificationCase.service";
import { SignoutCase } from "src/UseCases/AuthCases/SignoutCase.service";
import { SendVerificationCase } from "src/UseCases/AuthCases/SendVerificationCase.service";
import { ResetPasswordCase } from "src/UseCases/AuthCases/ResetPasswordCase.service";
import { RefreshTokenCase } from "src/UseCases/AuthCases/RefreshTokenCase.service";

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
        const { newUser, vt } = await this.signupCase.signupLocal(data);

        await this.mailer.send({
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            templateName: "verification-email",
            token: vt // verification token
        })

        return {
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            checked: newUser.checked
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
        const { user, newVerificationToken } = await this.sendVerificationCase.send(email, template);

        await this.mailer.send({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            templateName: template,
            token: newVerificationToken
        })
    }

    async resetPassword(userId: string, newPassword: string) {
        return this.resetPasswordCase.reset(userId, newPassword);
    }

    async refreshToken(userId: string) {
        return await this.refreshTolenCase.refresh(userId);
    }
}