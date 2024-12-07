import { PrismaService } from "src/utils/prisma/prisma.service";
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import "dotenv/config";
import { JwtService } from "src/utils/jwt/jwt.service";
import { Hashservice } from "src/utils/hashing/hash.service";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
    key = process.env.JWT_REFRESH_KEY

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private hash: Hashservice
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const refreshToken = request.headers?.authorization.split(" ")[1];
        if (!refreshToken) throw new UnauthorizedException("Refresh token is missing")

        const decoded = this.jwt.verifyToken(refreshToken, this.key) as any;

        const authCache = await this.prisma.authCache.findUnique(decoded.sub);
        if (!authCache.hashedRt) throw new UnauthorizedException("Refresh token is missing")

        const isEqual = this.hash.compareData(refreshToken, authCache.hashedRt);
        if (!isEqual) throw new UnauthorizedException("Unauthorized refresh token");

        request.user = { id: decoded.sub };
        return true;
    }
}