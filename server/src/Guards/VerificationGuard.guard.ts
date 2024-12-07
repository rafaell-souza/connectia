import { PrismaService } from "src/utils/prisma/prisma.service";
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import "dotenv/config";
import { JwtService } from "src/utils/jwt/jwt.service";
import { Hashservice } from "src/utils/hashing/hash.service";

@Injectable()
export class VerificationGuard implements CanActivate {
    key = process.env.JWT_VERIFICATION_KEY

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private hash: Hashservice
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const verificationToken = request.headers?.authorization.split(" ")[1];
        if (!verificationToken) throw new UnauthorizedException("Verification token is missing")

        const decoded = this.jwt.verifyToken(verificationToken, this.key) as any;

        const authCache = await this.prisma.authCache.findUnique(decoded.sub);
        if (!authCache.hashedVt) throw new UnauthorizedException("Verification token is missing");

        const isEqual = this.hash.compareData(verificationToken, authCache.hashedVt);
        if (!isEqual) throw new UnauthorizedException("Unauthorized verification token");

        request.user = { id: decoded.sub };
        return true;
    }
}