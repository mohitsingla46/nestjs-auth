import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly email: string;
}