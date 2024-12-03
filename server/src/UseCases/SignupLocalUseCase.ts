import { BadRequestException, Injectable } from "@nestjs/common";
import { ISignupUser } from "src/interface/ISignupUser";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class SignupLocalUseCase {
    constructor(private prisma: PrismaService) { }

    async signupLocal(
        data: ISignupUser,
        hashedVt: string
    ) {
        const hasUser = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        })
        
        if (hasUser) throw new BadRequestException("Email already used");

        const newUser = await this.prisma.user.create({
            data: {
                ...data,
                accountType: "LOCAL_ACCOUNT",
                profile: { create: { status: "ONLINE" } },
                authCache: { create: { hashedVt: hashedVt } }
            },
            select: {
                email: true,
                firstName: true,
                lastName: true
            }
        })

        return newUser;
    }
}