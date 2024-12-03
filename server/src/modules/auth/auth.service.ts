import { Injectable } from "@nestjs/common";
import { JwtService } from "src/utils/jwt/jwt.service";
import { Hashservice } from "src/utils/hashing/hash.service";
import { ISignupUser } from "src/interface/ISignupUser";
import { SignupLocalUseCase } from "src/UseCases/SignupLocalUseCase";
import { MailerService } from "src/utils/mailer/mailer.service";

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private hash: Hashservice,
        private signupLocalUseCase: SignupLocalUseCase,
        private mailer: MailerService
    ) { }

    async signupLocal(data: ISignupUser): Promise<String> {
        data.password = this.hash.hashData(data.password);

        const vt = this.jwt.createAccessToken(data.id, data.email);
        const hashedVt = this.hash.hashData(vt);

        const result = await this.signupLocalUseCase.signupLocal(data, hashedVt);

        await this.mailer.send({
            name: `${result.firstName} ${result.lastName}`,
            email: result.email,
            subject: "Email verification",
            templateName: "verification-email",
            token: vt // verification token
        })

        return result.email;
    }
}