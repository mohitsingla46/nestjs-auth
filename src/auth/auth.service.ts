import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./schemas/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signup(user: User): Promise<User> {
        const userCreated = await this.userModel.create(user);
        return userCreated;
    }

    async signin(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userModel.findOne({ 'email': email });
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, name: user.name, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}