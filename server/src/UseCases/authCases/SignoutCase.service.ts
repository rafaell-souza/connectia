import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class SignoutCase {
    constructor(
        private prisma: PrismaService,
    ) { }

    async signout(userId: string) {
        await this.prisma.$transaction([
            this.prisma.authCache.update({
                where: { userId: userId },
                data: { hashedRt: null }
            }),
            this.prisma.user.update({
                where: { id: userId },
                data: { lastLogOutAt: new Date() }
            })
        ])
    }
}