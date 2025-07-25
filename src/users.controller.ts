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
//   @HttpCode(200)
  // @HttpCode(HttpStatus.ACCEPTED)
  postProfile(@Req() req: Request, @Res() res: Response) {
//   postProfile(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    console.log(req.body);
    res.status(200)
    return {
        msg : 'Post Method'
    }
    // res.json({
    //   msg: 'Post method',
    // });
  }
}
