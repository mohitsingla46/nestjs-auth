import { Injectable } from "@nestjs/common";
import { User } from "./schemas/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable({})
export class AuthService{
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async signup(user: User): Promise<User>{
        const userCreated = await this.userModel.create(user);
        return userCreated;
    }
}