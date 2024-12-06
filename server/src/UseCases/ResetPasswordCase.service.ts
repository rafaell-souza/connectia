import { Injectable, NotFoundException } from "@nestjs/common";
import { Hashservice } from "src/utils/hashing/hash.service";
import { JwtService } from "src/utils/jwt/jwt.service";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class ResetPasswordCase {
    constructor(
        private prisma: PrismaService,
        private hash: Hashservice,
    ) { }

    async reset(userId: string, newPassword: string) {
        const hashedPassword = this.hash.hashData(newPassword);
        
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword }
            }),
            this.prisma.authCache.update({
                where: { userId: userId },
                data: { hashedRt: null }
            })
        ])
    }
}