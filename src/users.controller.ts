import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Redirect
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/users')
export class UsersController {
  @Get('/profile')
  getProfile(@Req() req: Request) {
    console.log(req.url);
    return {
      msg: 'Hello brother',
    };
  }

  @Post('/profile')
  @Redirect('/users/account',302)
//   @HttpCode(200)
  // @HttpCode(HttpStatus.ACCEPTED)
  // postProfile(@Req() req: Request, @Res() res: Response) {
  postProfile(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    console.log(req.body);
    res.status(200)
    const rn = Math.random()*10+1
    if(rn>5){
      return{
        url: '/users/account',
        statusCode : 302
      }
    }
    else{
      return {
        url : '/users/wallet',
        statusCode : 302
      }
    }
    // res.json({
    //   msg: 'Post method',
    // });
  }

  @Get('/account')
  redirectAccount(){
    return 'account Redirect is working'
  }

  @Get('/wallet')
  redirectWallet(){
    return 'wallet Redirect is working'
  }
}
