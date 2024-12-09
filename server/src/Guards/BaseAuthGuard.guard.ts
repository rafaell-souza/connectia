import { PrismaService } from "src/utils/prisma/prisma.service";
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import "dotenv/config";
import { compareAsc } from "date-fns";
import { JwtService } from "src/utils/jwt/jwt.service";

@Injectable()
export class BaseAuthGuard implements CanActivate {
    key = process.env.JWT_ACCESS_KEY

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const accessToken = request.headers?.authorization?.split(" ")[1];
        if (!accessToken) throw new UnauthorizedException("Access token is missing")

        const decoded = this.jwt.verifyToken(accessToken, this.key) as any;

        const user = await this.prisma.user.findUnique({
            where: { id: decoded.sub }
        });

        if (!user) throw new UnauthorizedException("User not signed up in the system")

        if (user.lastLogOutAt) {
            const lastLogOutAt = new Date(user.lastLogOutAt);
            const iat = new Date(decoded.iat * 1000);
            const old = compareAsc(lastLogOutAt, iat) === 1;
            if (old) throw new UnauthorizedException("Unauthorized connection");
        }

        request.user = { id: decoded.sub, email: decoded.email };
        return true;
    }
}