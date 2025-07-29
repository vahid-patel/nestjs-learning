import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post,Body } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //POST Signup
    @Post('signup')
    async signUp(@Body() signupData : SignupDto ){}

    //POST Login


    //POST Refresh Token
}
