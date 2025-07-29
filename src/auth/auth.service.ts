import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
    async signup(signupData : SignupDto){
        //Check if email is in use
        

        //Hash Password

        //Create user document and save in mongodb

    }
}
