import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

@Injectable()
export class JwtService {
    private readonly refresh_key = process.env.JWT_REFRESH_KEY
    private readonly access_key = process.env.JWT_ACCESS_KEY
    private readonly verification_key = process.env.JWT_VERIFICATION_KEY

    createAccessToken(
        userId: string,
        email: string
    ) {
        return jwt.sign({
            sub: userId,
            email: email,
            iat: new Date(),
        }, this.access_key, {
            expiresIn: "30m",
        })
    }

    createRefreshToken(userId: string) {
        return jwt.sign({
            sub: userId,
        }, this.refresh_key, {
            expiresIn: "1d",
        })
    }

    createVerificationToken(userId: string) {
        return jwt.sign({
            sub: userId,
        }, this.verification_key, {
            expiresIn: "15m",
        })
    }

    decodeToken(token: string) {
        return jwt.decode(token);
    }

    verifyToken(token: string, secret: string) {
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            throw new UnauthorizedException("You need a valid access token to access this resource");
        }
    }
}