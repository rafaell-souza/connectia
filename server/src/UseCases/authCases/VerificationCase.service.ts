import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class VerificationCase {
    constructor(private prisma: PrismaService) { }

    async verificationLocal(userId: string) {
        const [result] = await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: { checked: true },
                select: {
                    firstName: true, lastName: true,
                    email: true, checked: true
                }
            }),
            this.prisma.authCache.update({
                where: { userId: userId },
                data: { hashedVt: null }
            })
        ])

        return result
    }
}