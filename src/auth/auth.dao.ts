import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/users.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthDao {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async create(user: User): Promise<User> {
        return await this.userModel.create(user);
    }

    async findOne(email: string): Promise<User> {
        return await this.userModel.findOne({ 'email': email });
    }
}