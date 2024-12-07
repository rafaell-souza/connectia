import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ISigninUser } from "src/interface/ISigninUser";
import { Hashservice } from "src/utils/hashing/hash.service";
import { JwtService } from "src/utils/jwt/jwt.service";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class SigninCase {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private hash: Hashservice,
    ) { }

    async signinLocal(data: ISigninUser) {
        const user = await this.prisma.user.findFirst({
            where: { email: data.email }
        })

        if (!user) throw new NotFoundException("No matching user found");

        const isEqual = this.hash.compareData(data.password, user.password);
        if (!isEqual) throw new BadRequestException("Incorrect email or password");

        const access_token = this.jwt.createAccessToken(user.id, user.email);
        const refresh_token = this.jwt.createRefreshToken(user.id);
        const hashedRt = this.hash.hashData(refresh_token);

        await this.prisma.authCache.update({
            where: { userId: user.id },
            data: { hashedRt: hashedRt }
        })

        return { access_token, refresh_token };
    }
}