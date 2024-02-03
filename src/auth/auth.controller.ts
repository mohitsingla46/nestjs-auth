import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/users.dto";
import { User } from "./schemas/users.schema";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    async signup(@Body() user: UserDto): Promise<User>{
        return this.authService.signup(user);
    }
}