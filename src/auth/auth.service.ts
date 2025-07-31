import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private UserModel : Model<User>, private readonly JwtService : JwtService,
        @InjectModel(RefreshToken.name) private RefreshTokenModel : Model<RefreshToken>    
    ){}

    async signup(signupData : SignupDto){
        const {email, password, name } = signupData
        //Check if email is in use
        const EmailinUse =  await this.UserModel.findOne({email : email})

        if(EmailinUse)
            throw new BadRequestException("Email is already in use")

        //Hash Password
        
        const hashedPassword = await bcrypt.hash(password,10)
       

        //Create user document and save in mongodb
        await this.UserModel.create({
            name : name,
            email : email,
            password : hashedPassword
        })

        return 'Created'
    }

    async login(Credentials : loginDto){
        const {email, password} = Credentials
        //Find if the user exist by email
        const isUserExist = await this.UserModel.findOne({
            email : email
        })

        if(!isUserExist)
            throw new UnauthorizedException("Wrong Credentials")

        //Compare password with existing password
        const passwordMatch = await bcrypt.compare(password, isUserExist.password)

        if(!passwordMatch)
            throw new UnauthorizedException("Wrong Credentials")


        //Generate JWT Tokens
        const token = await this.generateUserToken(isUserExist._id)
        return {...token , userId : isUserExist._id}
    }

    async generateUserToken(userId){
        const accessToken =  await this.JwtService.sign({userId}, {expiresIn: '1h'})
        const refreshToken = uuidv4()

        this.storeRefreshToken(refreshToken,userId)
        return {accessToken,refreshToken}
    }

    async storeRefreshToken(token : string, userId){
        //calculate Expiry date
        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 3)

        await this.RefreshTokenModel.updateOne(
           {userId}, 
           {$set : {expiryDate, token}},
            {upsert : true}
        )
    }

    async refreshTokens(refreshToken : string){
        const token = await this.RefreshTokenModel.findOneAndDelete({
            token: refreshToken,
            expiryDate : {$gte : new Date()}
        })

        if(!token){
            throw new UnauthorizedException('Refresh Token is invalid')
        }

        return this.generateUserToken(token.userId)
    }
}
