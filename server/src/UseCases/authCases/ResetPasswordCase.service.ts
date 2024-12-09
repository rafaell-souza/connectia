import { BadGatewayException, Injectable } from "@nestjs/common";
import { Hashservice } from "src/utils/hashing/hash.service";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class ResetPasswordCase {
    constructor(
        private prisma: PrismaService,
        private hash: Hashservice,
    ) { }

    async reset(userId: string, newPassword: string) {
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({ where: { id: userId } });

            const isEqual = this.hash.compareData(newPassword, user.password);
            if (isEqual) throw new BadGatewayException("The new password cannot be the same as the previous one");

            const hashedPassword = this.hash.hashData(newPassword);

            await tx.user.update({
                where: { id: userId },
                data: { password: hashedPassword }
            })
            
            await tx.authCache.update({
                where: { userId: userId },
                data: { hashedRt: null }
            })
        })
    }
}