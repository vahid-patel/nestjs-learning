import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post,Body } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { loginDto } from './dtos/login.dto';
import { RefreshTokendto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //POST Signup
    @Post('signup')
    async signUp(@Body() signupData : SignupDto ){
      return this.authService.signup(signupData)
    }

    //POST Login
    @Post('login')
    async login(@Body() Credentials : loginDto){
      return this.authService.login(Credentials)
    }

    //POST Refresh Token
    @Post('refresh')
    async refreshTokens(@Body() RefreshTokendto : RefreshTokendto){
      return this.authService.refreshTokens(RefreshTokendto.refreshToken)
    }
}
