import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({  

  controllers: [UsersController], 
  imports: [AuthModule, MongooseModule.forRoot('mongodb+srv://ayyubbhai1885:vahidpatel123@cluster0.blcdvyl.mongodb.net/nest-js-learning')],
})
export class AppModule {}
