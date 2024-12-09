import { BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class DeleteUserCase {
    constructor(private prisma: PrismaService) { }
    async delete(userId: string) {
        await this.prisma.user.delete({
            where: { id: userId }
        })
    }
}