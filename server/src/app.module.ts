import { Module } from '@nestjs/common';
import { PrismaModule } from './utils/prisma/prisma.module';
import { JwtModule } from './utils/jwt/jwt.module';
import { Hashmodule } from './utils/hashing/hash.module';
import { MailerModule } from './utils/mailer/mailer.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PrismaModule, MailerModule, Hashmodule,
    JwtModule, AuthModule, UserModule
  ],
})
export class AppModule { }
