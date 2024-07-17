import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./schemas/users.schema";
import { JwtService } from '@nestjs/jwt';
import { AuthDao } from "./auth.dao";

@Injectable({})
export class AuthService {
    constructor(
        private readonly authDao: AuthDao,
        private jwtService: JwtService
    ) { }

    async signup(user: User): Promise<User> {
        try {
            return await this.authDao.create(user);
        }
        catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async signin(email: string, password: string): Promise<{ access_token: string }> {
        try {
            const user = await this.authDao.findOne(email);
            if (user?.password !== password) {
                throw new UnauthorizedException();
            }
            const payload = { name: user.name, email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
}