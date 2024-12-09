import { BadGatewayException, Injectable } from "@nestjs/common";
import { IUserResetPassword } from "src/interface/IUserResetPassword";
import { Hashservice } from "src/utils/hashing/hash.service";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class ResetPasswordCase {
    constructor(
        private prisma: PrismaService,
        private hash: Hashservice
    ) { }

    async reset(userId: string, data: IUserResetPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        const isEqual = this.hash.compareData(data.oldPassword, user.password);
        const isTheSame = this.hash.compareData(data.newPassword, user.password);

        if (!isEqual) throw new BadGatewayException("Old password is wrong")
        if (isTheSame) throw new BadGatewayException("The new password cannot be the same as the previous one");

        const hashedPassword = this.hash.hashData(data.newPassword);

        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        })
    }
}