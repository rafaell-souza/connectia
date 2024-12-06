import { Injectable, NotFoundException } from "@nestjs/common";
import { Hashservice } from "src/utils/hashing/hash.service";
import { JwtService } from "src/utils/jwt/jwt.service";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class SendVerificationCase {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private hash: Hashservice,
    ) { }

    async send(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } })
        if (!email) throw new NotFoundException(`No user found with: ${email}`);

        const newVerificationToken = this.jwt.createVerificationToken(user.id);
        const hashedVt = this.hash.hashData(newVerificationToken);

        await this.prisma.authCache.update({
            where: { userId: user.id },
            data: { hashedVt: hashedVt }
        })

        return { user, newVerificationToken };
    }
}