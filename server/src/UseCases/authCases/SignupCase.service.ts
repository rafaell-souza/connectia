import { ConflictException, Injectable } from "@nestjs/common";
import { ISignupUser } from "src/interface/ISignupUser";
import { PrismaService } from "src/utils/prisma/prisma.service";
import { JwtService } from "src/utils/jwt/jwt.service";
import { Hashservice } from "src/utils/hashing/hash.service";

@Injectable()
export class SignupCase {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private hash: Hashservice,
    ) { }

    async signupLocal(data: ISignupUser) {
        const hasUser = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if (hasUser) throw new ConflictException("Email already used");

        data.password = this.hash.hashData(data.password);

        const vt = this.jwt.createAccessToken(data.id, data.email);
        const hashedVt = this.hash.hashData(vt);

        const newUser = await this.prisma.user.create({
            data: {
                ...data,
                checked: false,
                accountType: "LOCAL_ACCOUNT",
                profile: { create: { status: "ONLINE" } },
                authCache: { create: { hashedVt: hashedVt } }
            },
            select: {
                email: true,
                firstName: true,
                lastName: true,
                checked: true,
                authCache: { select: { hashedVt: true } }
            }
        })

        return newUser;
    }
}