import { Injectable } from "@nestjs/common";
import { Hashservice } from "src/utils/hashing/hash.service";
import { JwtService } from "src/utils/jwt/jwt.service";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class RefreshTokenCase {
    constructor(
        private prisma: PrismaService,
        private hash: Hashservice,
        private jwt: JwtService
    ) { }

    async refresh(userId: string, email: string) {
        const access_token = this.jwt.createAccessToken(userId, email);
        const refresh_token = this.jwt.createRefreshToken(userId);
        const hashedRt = this.hash.hashData(refresh_token);

        await this.prisma.authCache.update({
            where: { userId: userId },
            data: { hashedRt: hashedRt }
        })

        return { access_token, refresh_token };
    }
}