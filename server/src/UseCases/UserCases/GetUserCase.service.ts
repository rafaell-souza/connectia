import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class GetUserCase {
    constructor(private prisma: PrismaService) { }
    async getUser(userId: string) {
        return await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            }
        })
    }
}