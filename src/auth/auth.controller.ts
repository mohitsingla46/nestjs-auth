import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards, Get, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { User } from "./schemas/users.schema";
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from "../decorators/roles.decorator";
import { SignInDto } from "./dto/signin.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @ApiTags('public')
    @UsePipes(ValidationPipe)
    async signup(@Body() user: SignUpDto): Promise<User> {
        return this.authService.signup(user);
    }

    @Post('signin')
    @ApiTags('public')
    @UsePipes(ValidationPipe)
    async signin(@Body() user: SignInDto): Promise<any> {
        return this.authService.signin(user.email, user.password);
    }

    @Get('profile')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Roles('ADMIN', 'VENDOR', 'USER')
    getProfile(@Request() req) {
        return req.user;
    }

}