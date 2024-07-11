import { IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;
}