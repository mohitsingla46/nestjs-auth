import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards, Get, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/users.dto";
import { User } from "./schemas/users.schema";
import { AuthGuard } from './auth.guard';
import { Roles } from "src/auth/roles.decorator";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    @UsePipes(ValidationPipe)
    async signup(@Body() user: UserDto): Promise<User>{
        return this.authService.signup(user);
    }

    @Post('signin')
    @UsePipes(ValidationPipe)
    async signin(@Body() user): Promise<any>{
        return this.authService.signin(user.email, user.password);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    @Roles('ADMIN','VENDOR','USER')
    getProfile(@Request() req) {
        return req.user;
    }

}