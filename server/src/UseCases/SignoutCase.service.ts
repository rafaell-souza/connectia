import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class SignoutCase {
    constructor(
        private prisma: PrismaService,
    ) { }

    async signout(userId: string) {
        return await this.prisma.authCache.update({
            where: { userId: userId },
            data: { hashedRt: null }
        })
    }
}